import { useLayoutEffect } from "react";
import rough from "roughjs";

export function Draw() {
  const generator = rough.generator();

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const result = rough.canvas(canvas);

    const rectangle = generator.line(100, 200, 100, 300);
    result.draw(rectangle);
  });

  return (
    <canvas id="canvas" width={window.innerWidth} height={window.innerHeight}>
      Canvas API
    </canvas>
  );
}
