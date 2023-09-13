import { useEffect, useRef } from "react";

export function useDraw() {
  const locationRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function handleMouseOver(e: MouseEvent) {
      console.log({ x: e.clientX, y: e.clientY });
    }

    locationRef.current?.addEventListener("mousemove", handleMouseOver);

    return () =>
      locationRef.current?.removeEventListener("mousemove", handleMouseOver);
  }, []);

  return { locationRef };
}
