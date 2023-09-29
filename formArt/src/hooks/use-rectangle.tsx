import { useState, useEffect } from "react";
import { CoOrdinates } from "../shared/types";

export function useRectangle() {
  const [prevCoordinates, setPrevCoordinates] = useState<CoOrdinates>({
    x: 0,
    y: 0,
  });
  const [currentCoordinates, setCurrentCoordinates] = useState<CoOrdinates>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function handleRectangleMouseDown(e: MouseEvent) {
      setPrevCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
    }

    function handleRectangleMouseUp(e: MouseEvent) {
      setCurrentCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
    }

    window.addEventListener("mousedown", handleRectangleMouseDown);

    return () => window.removeEventListener("mouseup", handleRectangleMouseUp);
  }, []);
  return { prevCoordinates, currentCoordinates };
}
