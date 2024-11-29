export interface useDrawProps {
  currentPoint: CoOrdinates;
  previousPoint: CoOrdinates | null;
  context: CanvasRenderingContext2D;
  selectedLineWidth: number;
}

export interface CoOrdinates {
  x: number;
  y: number;
}

export type HEX = `#${string}`;
