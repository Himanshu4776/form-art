import { useAtom } from "jotai";
import { updateToolItem } from "../hooks/use-toolbox";
import { COLORS_PALETE, color } from "../shared/constants";
import "react-color-palette/css";

export function ToolBox() {
  const [, setLineColor] = useAtom(color);

  return (
    <>
      <div id="tool-item">
        <button onClick={() => updateToolItem(1)}>Pencil</button>
        <button onClick={() => updateToolItem(2)}>Shape box</button>
      </div>
      <div id="item-color">
        <button id="red" className="pr-5" onClick={() => setLineColor(COLORS_PALETE.RED)}>
          Red
        </button>
        <button id="green" className="pr-5" onClick={() => setLineColor(COLORS_PALETE.GREEN)}>
          Green
        </button>
        <button id="black" className="pr-5" onClick={() => setLineColor(COLORS_PALETE.BLACK)}>
          Black
        </button>
        <button id="MAROON" className="pr-5" onClick={() => setLineColor(COLORS_PALETE.MAROON)}>
        MAROON
        </button>
        <button id="ORANGE" className="pr-5" onClick={() => setLineColor(COLORS_PALETE.ORANGE)}>
        ORANGE
        </button>
        <button id="PEACH" className="pr-5" onClick={() => setLineColor(COLORS_PALETE.PEACH)}>
        blue
        </button>
        <button id="SKY_BLUE" className="pr-5" onClick={() => setLineColor(COLORS_PALETE.SKY_BLUE)}>
        SKY_BLUE
        </button>
        <button id="VIOLET" className="pr-5" onClick={() => setLineColor(COLORS_PALETE.VIOLET)}>
        VIOLET
        </button>
        <button id="WHITE" className="pr-5" onClick={() => setLineColor(COLORS_PALETE.WHITE)}>
        WHITE
        </button>
        <button id="YELLOW" className="pr-5" onClick={() => setLineColor(COLORS_PALETE.YELLOW)}>
        YELLOW
        </button>
      </div>
    </>
  );
}


// "roughjs": "^4.5.2"