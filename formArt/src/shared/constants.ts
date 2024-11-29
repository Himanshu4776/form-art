import { atom } from "jotai";
import { HEX } from "./types";

export const Items = {
  PENCIL: "pencil",
  LINE: "line",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
};

export const COLORS_PALETE = {
  RED: "#FF0000",
  GREEN: "#00FF00",
  BLACK: "#000000",
  MAROON: "#800000",
  ORANGE: "#FFA500",
  PEACH: "#FFE5B4",
  SKY_BLUE: "#87CEEB",
  VIOLET: "#8A2BE2",
  WHITE: "#FFFFFF",
  YELLOW: "#FFFF00",
};

export const LINE_WIDTHS = {
  SMALL: 2,
  MEDIUM: 5,
  LARGE: 10
} as const;

export const color = atom(COLORS_PALETE.BLACK);
export const element = atom(Items.PENCIL);
export const lineWidth = atom(LINE_WIDTHS.SMALL);

export const tool = atom<number>(0);
// export const lineWidth = atom<number>(LINE_WIDTHS.SMALL);
// export const color = atom<HEX>("#000");
// export const element = atom<number>(Items.PENCIL);
// export const color = atom<string>("000");