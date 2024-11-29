import { useState, useEffect, useRef } from "react";
import { CoOrdinates } from "../shared/types";
import { useAtom } from "jotai";
import { lineWidth } from "../shared/constants";

interface useRectangleProps {
  currentPoint: CoOrdinates;
  previousPoint: CoOrdinates | null;
  context: CanvasRenderingContext2D;
  selectedLineWidth: number;
}

export function useRectangle(onDraw: ({context, currentPoint, previousPoint, selectedLineWidth}: useRectangleProps) => void) {
  const [selectedLineWidth] = useAtom(lineWidth);
  const locationRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<CoOrdinates | null>(null);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  
  const handleMouseDown = (e: MouseEvent) => {
    setMouseDown(true);
    if(LocationInCanvas(e)) {
      prevPoint.current = LocationInCanvas(e) || null;
    }
  }
  
  const LocationInCanvas = (e: MouseEvent) => {
    const canvas = locationRef.current;
    if(!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const value: CoOrdinates = {x,y};

    return value;
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if(!mouseDown) return;
      const currPoint = LocationInCanvas(e);
      const context = locationRef.current?.getContext("2d");

      if (!context || !currPoint) return;

      onDraw({context, currentPoint: currPoint, previousPoint: prevPoint.current, selectedLineWidth});
      prevPoint.current = currPoint;
    };

    function handleMouseUp() {
      setMouseDown(false);
      prevPoint.current = null;
    }

    locationRef.current?.addEventListener("mousemove", handler);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      locationRef.current?.removeEventListener("mousemove", handler);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [onDraw, mouseDown, selectedLineWidth]);

  return { locationRef, handleMouseDown };
}

