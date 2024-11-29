import { useEffect, useRef, useState } from "react";
import { useDraw } from "../hooks/use-draw";
import { useDrawProps } from "../shared/types";
import { useAtom } from "jotai";
import { color, lineWidth, element, Items } from "../shared/constants";
import { DrawCurveProps, drawCurve } from "../shared/hooks/draw-curve";
import { io, Socket } from "socket.io-client";
import { Trash2, Share2 } from 'lucide-react';
import { useLocation } from 'react-router-dom'; // Import this

export function Draw() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string>('');
  const [shareContent, setShareContent] = useState(false);
  
  const location = useLocation(); // Use this hook to get the current URL

  const [lineColor] = useAtom(color);
  const [selectedLineWidth] = useAtom(lineWidth);
  const [selectedElement] = useAtom(element);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:8000', {
      transports: ['websocket', 'polling'],
      reconnectionDelayMax: 10000,
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roomFromURL = queryParams.get('room');
    
    if (roomFromURL && socket) {
      socket.emit('join-room', {
        roomId: roomFromURL,
        userName: 'User-' + Math.floor(Math.random() * 1000),
        isHost: false
      });
      
      setRoomId(roomFromURL);
      setShareContent(true);
    }
  }, [location.search, socket]);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const { handleMouseDown } = useDraw(createCurve);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let tempCanvas: HTMLCanvasElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!tempCanvas) {
        tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0);
        }
      }

      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCtx.strokeStyle = lineColor;
      tempCtx.lineWidth = selectedLineWidth;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(tempCanvas, 0, 0);

      context.strokeStyle = lineColor;
      context.lineWidth = selectedLineWidth;

      switch (selectedElement) {
        case Items.PENCIL:
          context.lineTo(x, y);
          context.stroke();
          break;
        case Items.LINE:
          context.beginPath();
          context.moveTo(startPoint.current.x, startPoint.current.y);
          context.lineTo(x, y);
          context.stroke();
          break;
        case Items.RECTANGLE:
          const width = x - startPoint.current.x;
          const height = y - startPoint.current.y;
          context.strokeRect(startPoint.current.x, startPoint.current.y, width, height);
          break;
        case Items.CIRCLE:
          const radius = Math.sqrt(
            Math.pow(x - startPoint.current.x, 2) + Math.pow(y - startPoint.current.y, 2)
          );
          context.beginPath();
          context.arc(startPoint.current.x,startPoint.current.y, radius, 0, 2 * Math.PI);
          context.stroke();
          break;
      }
    };

    const handleMouseUp = () => {
      if (tempCanvas) {
        context.drawImage(tempCanvas, 0, 0);
        tempCanvas = null;
      }
      isDrawing.current = false;
      context.beginPath();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [lineColor, selectedLineWidth, selectedElement]);

  useEffect(() => {
    if (!socket) return;
  
    socket.on('draw', ({ previousPoint, currentPoint, lineColor: remoteColor, selectedLineWidth: remoteWidth }: DrawCurveProps) => {
      const context = canvasRef.current?.getContext('2d');
      if (!context) return;
      console.log("drawing");
      
      
      drawCurve({ previousPoint, currentPoint, context, lineColor: remoteColor, selectedLineWidth: remoteWidth });
    });
  
    socket.on('clean', () => {
      clear();
    });
  
    return () => {
      socket.off('draw');
      socket.off('clean');
    };
  }, [socket]);
  

  function createCurve({ previousPoint, currentPoint, context, selectedLineWidth }: useDrawProps) {
    if (shareContent && socket?.connected) {
      socket.emit('draw', { previousPoint, currentPoint, lineColor, selectedLineWidth, roomId });
    }
    drawCurve({ previousPoint, currentPoint, context, lineColor, selectedLineWidth });
  }  

  function cleanWindow() {
    if (shareContent && socket?.connected) {
      socket.emit('clean');
    }
    clear();
  }

  function joinRoom() {
    if (!socket) return;
   
    const newRoomId = Math.random().toString(36).substring(7);
    setRoomId(newRoomId);
   
    socket.emit('join-room', {
      roomId: newRoomId,
      userName: 'User-' + Math.floor(Math.random() * 1000),
      isHost: true
    });
   
    setShareContent(true);
  
    // Create shareable URL with the correct route
    const shareableUrl = `${window.location.origin}/draw?room=${newRoomId}`;
  
    console.log("shareableUrl: ", shareableUrl);
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      startPoint.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    handleMouseDown();
  };

  return (
    <div className="bg-white p-4 flex flex-col h-full">
      <div className="flex justify-end space-x-2 mb-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
          onClick={cleanWindow}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Clear All
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
          onClick={joinRoom}
          disabled={shareContent}
        >
          <Share2 className="mr-2 h-4 w-4" /> 
          {shareContent ? `Room: ${roomId}` : 'Share art'}
        </button>
      </div>
      <div className="flex-1 overflow-hidden border rounded-lg shadow-lg">
        <canvas
          id="canvas"
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          width={window.innerWidth - 32}
          height={window.innerHeight - 200}
          className="w-full h-full"
        >
          Canvas API
        </canvas>
      </div>
    </div>
  );
}
