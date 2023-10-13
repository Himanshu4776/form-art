import { useDrawProps } from "../types";

export type DrawCurveProps = useDrawProps & {
    lineColor: string;
    selectedLineWidth: number;
}

export const drawCurve = ({previousPoint, currentPoint, context, lineColor, selectedLineWidth}: DrawCurveProps) => {
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