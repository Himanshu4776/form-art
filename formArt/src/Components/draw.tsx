import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDraw } from "../hooks/use-draw";
import { useDrawProps } from "../shared/types";
import { useAtom } from "jotai";
import { color } from "../shared/constants";

export function Draw() {
  // const generator = rough.generator();
  const [lineColor , setLineColor] = useAtom(color);

  const { locationRef, handleMouseDown, clear } = useDraw(drawLine);

  function drawLine({previousPoint, currentPoint, context}: useDrawProps) {
    const { x: currX, y: currY} = currentPoint;
    const lineWidth = 5

    let startPoint = previousPoint ?? currentPoint;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor;
    context.moveTo(startPoint?.x, startPoint?.y);
    context.lineTo(currX, currY);
    context.stroke();

    context.fillStyle = lineColor;
    context.arc(startPoint.x, startPoint.y, 2, 0, 2*Math.PI)
    context.fill();
  }

  // const { prevCoordinates } = useRectangle();
  // const { currentCoordinates } = useRectangle();

  // console.log(locationRef.current);

  // useLayoutEffect(() => {
  //   const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  //   const result = rough.canvas(canvas);

  //   // const rectangle = generator.rectangle(100, 200, 100, 300);
  //   // const circle = generator.circle(100, 200, 100);

  //   // const rectangle = generator.line(
  //   //   locationValue?.x,
  //   //   locationValue?.x + 100,
  //   //   locationValue?.y,
  //   //   locationValue?.y + 300
  //   // );

  //   const dynamicRectangle = generator.line(
  //     prevCoordinates.x,
  //     prevCoordinates.y,
  //     currentCoordinates.x,
  //     currentCoordinates.y
  //   );

  //   console.log("dynamicRectangle", prevCoordinates, currentCoordinates);

  //   result.draw(dynamicRectangle);

  //   // result.draw(rectangle);
  //   // result.draw(circle);
  // });

  return (
    <div className="w-screen h-screen bg-white flex-col flex justify-center items-center">
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
      <div className=" p-10">
      <button id="clear" type="button" onClick={clear}>clear All</button>
      </div>
    </div>
  );
}
