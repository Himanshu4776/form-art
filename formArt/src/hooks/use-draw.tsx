import { useEffect, useRef, useState } from "react";
import { CoOrdinates, useDrawProps } from "../shared/types";

export function useDraw(onDraw: ({context, currentPoint, previousPoint}: useDrawProps) => void) {
  const locationRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<CoOrdinates | null> (null);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const handleMouseDown = () => setMouseDown(true);

  const clear = () => {
    const canvas = locationRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if(!mouseDown) return;
      const currPoint = LocationInCanvas(e);
      const context = locationRef.current?.getContext("2d");

      if (!context || !currPoint) return;

      onDraw({context, currentPoint: currPoint, previousPoint: prevPoint.current});
      prevPoint.current = currPoint;
    };

    const LocationInCanvas = (e: MouseEvent) => {
      const canvas = locationRef.current;
      if(!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return {x,y};
    }

    function handleMouseUp() {
      setMouseDown(false);
      prevPoint.current = null;
    }

    locationRef.current?.addEventListener("mousemove", handler);
    window.addEventListener('mouseup', handleMouseUp)

    return () =>
      {
        locationRef.current?.removeEventListener("mousemove", handler);
        window.removeEventListener('mouseup', handleMouseDown);
      }
  }, [onDraw]);

  return { locationRef, handleMouseDown, clear };
}
