import { useAtom } from "jotai";
import { lineWidth, tool } from "../shared/constants";

export function updateLineWidth(newLineWidth: number) {
  const [, setLineWidth] = useAtom(lineWidth);
  setLineWidth(newLineWidth);
}

export function updateToolItem(toolItemNumber: number) {
  const [, setToolItem] = useAtom(tool);
  setToolItem(toolItemNumber);
}
