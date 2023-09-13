import { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs";
import { useDraw } from "../hooks/useDraw";

export function Draw() {
  const generator = rough.generator();

  const { locationRef } = useDraw();

  console.log(locationRef.current);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const result = rough.canvas(canvas);

    const rectangle = generator.line(100, 200, 100, 300);
    result.draw(rectangle);
  });

  return (
    <canvas
      id="canvas"
      ref={locationRef}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      Canvas API
    </canvas>
  );
}
