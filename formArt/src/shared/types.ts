export interface useDrawProps {
  currentPoint: CoOrdinates;
  previousPoint: CoOrdinates | null;
  context: CanvasRenderingContext2D;
}

export interface CoOrdinates {
  x: number;
  y: number;
}

export type HEX = `#${string}`;
