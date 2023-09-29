import { useAtom } from "jotai";
import { color } from "../shared/constants";
import { HEX } from "../shared/types";

export function updateColor(colorToUpdate: HEX) {
  const [, setLineColor] = useAtom(color);
  setLineColor(colorToUpdate);
}
