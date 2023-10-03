import { atom } from "jotai";
import { HEX } from "./types";

export const Items = {
  PENCIL: 1,
  SHAPE_BOX: 2,
} as const;

export const COLORS_PALETE = {
  RED: "#E74C3C",
  GREEN: "#2ECC71",
  WHITE: "#ECF0F1",
  BLACK: "#2C3E50",
  MAROON: "#C0392B",
  VIOLET: "#8E44AD",
  SKY_BLUE: "#3498DB",
  PEACH: "#2980B9",
  YELLOW: "#F1C40F",
  ORANGE: "#F39C12"
} as const

export const LINE_WIDTHS = {
  SMALL: 5,
  MEDIUM: 8,
  LARGE: 10
} as const;

export const tool = atom<number>(0);
export const lineWidth = atom<number>(LINE_WIDTHS.SMALL);
export const color = atom<HEX>("#000");
export const element = atom<number>(Items.PENCIL);
// export const color = atom<string>("000");