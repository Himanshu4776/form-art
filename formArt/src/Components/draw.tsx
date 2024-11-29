import { useEffect, useRef, useState } from "react";
import { useDraw } from "../hooks/use-draw";
import { useDrawProps } from "../shared/types";
import { useAtom } from "jotai";
import { color, lineWidth, element, Items } from "../shared/constants";
import { drawCurve } from "../shared/hooks/draw-curve";
import { io } from "socket.io-client";

export function Draw() {
  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000');
  const [shareContent, setShareContent] = useState(false);

  const socket = io(socketUrl);

  const [lineColor] = useAtom(color);
  const [selectedLineWidth] = useAtom(lineWidth);
  const [selectedElement] = useAtom(element);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });

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
          context.arc(startPoint.current.x, startPoint.current.y, radius, 0, 2 * Math.PI);
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

    socket.on('clean', () => {
      clear();
    });

    return () => {
      socket.off('clean');
    };
  }, [socket]);

  function createCurve({ previousPoint, currentPoint, context }: useDrawProps) {
    if (shareContent && socket.active) {
      socket.emit('draw', { previousPoint, currentPoint, lineColor, selectedLineWidth });
    }
    drawCurve({ previousPoint, currentPoint, context, lineColor, selectedLineWidth });
  }

  function cleanWindow() {
    if (shareContent && socket.active) {
      socket.emit('clean');
    }
    clear();
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
    <div className="bg-indigo-600">
      <div className="float-right flex flex-row space-x-4 pr-4 pb-1">
        <button id="clear" type="button" className="bg-red-500 text-white p-2 rounded-md" onClick={cleanWindow}>
          Clear All
        </button>
        <button
          id="server"
          type="button"
          className="bg-green-500 text-white p-2 rounded-md"
          onClick={() => {
            setSocketUrl(socketUrl + `/${socket.id}`);
            setShareContent(true);
          }}
        >
          Share art
        </button>
      </div>
      <div className="w-screen h-screen bg-white justify-center flex flex-row items-center">
        <canvas
          id="canvas"
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          width={window.innerWidth - 60}
          height={window.innerHeight - 120}
          className="border solid border-black rounded-md shadow-zinc-800 shadow-lg"
        >
          Canvas API
        </canvas>
      </div>
    </div>
  );
}

