import { useDraw } from "../hooks/use-draw";
import { useDrawProps } from "../shared/types";
import { useAtom } from "jotai";
import { color, lineWidth } from "../shared/constants";
import { DrawCurveProps, drawCurve } from "../shared/hooks/draw-curve";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function Draw() {

  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000');

  const socket = io(socketUrl);

  const [lineColor] = useAtom(color);
  const [selectedLineWidth] = useAtom(lineWidth);

  const { locationRef, handleMouseDown, clear } = useDraw(createCurve);

  useEffect(() => {
    const context = locationRef.current?.getContext('2d');

    if(!context) {
      console.log('context is invalid');
      return
    }

    socket.on('draw', ({previousPoint, currentPoint, lineColor, selectedLineWidth}: DrawCurveProps) => {
      console.log('recioeved', previousPoint, currentPoint, lineColor, context, selectedLineWidth);
      drawCurve({previousPoint, currentPoint, lineColor, context, selectedLineWidth});
      
    })

    socket.on('clean', () => [
      clear()
    ])
  }, [locationRef])

  function createCurve({previousPoint, currentPoint, context}: useDrawProps) {
    console.log('socket.active', socket.active);
    
    if(socket.active) {
      if(previousPoint == null) {
        previousPoint = currentPoint;
      }
      socket.emit('draw', {previousPoint, currentPoint, lineColor, selectedLineWidth});
      console.log('sent value,', previousPoint, currentPoint, lineColor, selectedLineWidth);
    }
    else {
      console.log('disconnected');
      
      socket.connect()
    }
    drawCurve({previousPoint, currentPoint, context, lineColor, selectedLineWidth});
  }

  function cleanWindow() {
    socket.emit('clean');
    clear();
  }

  return (
      <div className="bg-yellow-300">
        <div className="float-right flex flex-row space-x-4 pr-4 pb-1">
          <button id="clear" type="button" className="bg-red-500 text-white p-2 rounded-md" onClick={cleanWindow}>clear All</button>
          {/* <button id="server" type="button" className="bg-green-500 text-white p-2 rounded-md" onClick={handleClickSendMessage}>Client call</button> */}
        </div>
        {/* <div className="w-screen h-screen bg-white justify-center flex p-4"> */}
        <div className="w-screen h-screen bg-white justify-center flex flex-row items-center">
          <canvas
            id="canvas"
            onMouseDown={handleMouseDown}
            ref={locationRef}
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
