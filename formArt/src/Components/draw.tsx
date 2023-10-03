import { useCallback } from "react";
import { useDraw } from "../hooks/use-draw";
import { useDrawProps } from "../shared/types";
import { useAtom } from "jotai";
import { color, lineWidth } from "../shared/constants";

export function Draw() {
  const [lineColor] = useAtom(color);
  const [selectedLineWidth] = useAtom(lineWidth);

  const { locationRef, handleMouseDown, clear } = useDraw(draw);

  function draw({previousPoint, currentPoint, context}: useDrawProps) {
    const { x: currX, y: currY} = currentPoint;

    let startPoint = previousPoint ?? currentPoint;
    context.beginPath();
    context.lineWidth = selectedLineWidth;
    context.strokeStyle = lineColor;
    context.moveTo(startPoint?.x, startPoint?.y);
    context.lineTo(currX, currY);
    context.stroke();

    context.fillStyle = lineColor;
    context.arc(startPoint.x, startPoint.y, 2, 0, 2*Math.PI)
    context.fill();
  }

  return (
      <div className="bg-yellow-300">
        <div className="float-right flex flex-row space-x-4 pr-4 pb-1">
          <button id="clear" type="button" className="bg-red-500 text-white p-2 rounded-md" onClick={clear}>clear All</button>
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
