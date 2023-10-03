import { useAtom } from "jotai";
import { COLORS_PALETE, Items, LINE_WIDTHS, color, element, lineWidth } from "../shared/constants";
import "react-color-palette/css";
import NavDropdown from 'react-bootstrap/NavDropdown';

export function ToolBox() {
  const [, setLineColor] = useAtom(color);
  const [elementSelected , setElementSelected] = useAtom(element);
  const [selectedLineWidth, setSelectedLineWidth] = useAtom(lineWidth);

  return (
    <div className="bg-yellow-300 mt-2 pb-2">
      <div id="tool-item" className="flex flex-row">
        <button className="px-2 text-BLACK" id="pencil" onClick={() => setElementSelected(Items.PENCIL)}>Pencil</button>
        {/* <button className="px-2 text-BLACK" id="shape-box" onClick={() => setElementSelected(Items.SHAPE_BOX)}>Shape box</button> */}
        <div className={`${elementSelected === Items.PENCIL ? 'bg-gray-300' : ''} p-1 text-BLACK`}>
          <NavDropdown title="Shapes" id="basic-nav-dropdown" disabled={elementSelected === Items.PENCIL}>
            <NavDropdown.Item onClick={() => {}}>Line</NavDropdown.Item>
            <NavDropdown.Item >
              Reactangle
            </NavDropdown.Item>
            <NavDropdown.Item >Circle</NavDropdown.Item>
          </NavDropdown>
        </div>
        <div className={`p-1 text-BLACK`}>
          <NavDropdown title="Line Width" id="Line-width-dropdown">
            <NavDropdown.Item onClick={() => setSelectedLineWidth(LINE_WIDTHS.SMALL)}>Small</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setSelectedLineWidth(LINE_WIDTHS.MEDIUM)}>Medium</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setSelectedLineWidth(LINE_WIDTHS.LARGE)}>Large</NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
      <div id="item-color" className="pl-2 space-x-2">
        <button id="red" className="p-3 rounded-xl bg-RED" onClick={() => setLineColor(COLORS_PALETE.RED)}></button>
        <button id="green" className="p-3 rounded-xl bg-GREEN" onClick={() => setLineColor(COLORS_PALETE.GREEN)}></button>
        <button id="black" className="p-3 rounded-xl bg-BLACK" onClick={() => setLineColor(COLORS_PALETE.BLACK)}></button>
        <button id="MAROON" className="p-3 rounded-xl bg-MAROON" onClick={() => setLineColor(COLORS_PALETE.MAROON)}></button>
        <button id="ORANGE" className="p-3 rounded-xl bg-ORANGE" onClick={() => setLineColor(COLORS_PALETE.ORANGE)}></button>
        <button id="PEACH" className="p-3 rounded-xl bg-PEACH" onClick={() => setLineColor(COLORS_PALETE.PEACH)}></button>
        <button id="SKY_BLUE" className="p-3 rounded-xl bg-SKY_BLUE" onClick={() => setLineColor(COLORS_PALETE.SKY_BLUE)}></button>
        <button id="VIOLET" className="p-3 rounded-xl bg-VIOLET" onClick={() => setLineColor(COLORS_PALETE.VIOLET)}></button>
        <button id="WHITE" className="p-3 rounded-xl bg-WHITE" onClick={() => setLineColor(COLORS_PALETE.WHITE)}></button>
        <button id="YELLOW" className="p-3 rounded-xl bg-YELLOW" onClick={() => setLineColor(COLORS_PALETE.YELLOW)}></button>
      </div>
    </div>
  );
}
