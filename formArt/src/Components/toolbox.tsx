import { useAtom } from "jotai";
import { COLORS_PALETE, Items, LINE_WIDTHS, color, element, lineWidth } from "../shared/constants";
import "react-color-palette/css";
import NavDropdown from 'react-bootstrap/NavDropdown';

export function ToolBox() {
  const [, setLineColor] = useAtom(color);
  const [elementSelected, setElementSelected] = useAtom(element);
  const [selectedLineWidth, setSelectedLineWidth] = useAtom(lineWidth);

  return (
    <div className="bg-yellow-300 mt-2 pb-2">
      <div id="tool-item" className="flex flex-row items-center">
        <button
          className={`px-2 py-1 text-black ${elementSelected === Items.PENCIL ? 'bg-gray-300' : ''}`}
          id="pencil"
          onClick={() => setElementSelected(Items.PENCIL)}
        >
          Pencil
        </button>
        <NavDropdown
          title="Shapes"
          id="basic-nav-dropdown"
          className={`px-2 py-1 ${elementSelected !== Items.PENCIL ? 'bg-gray-300' : ''}`}
        >
          <NavDropdown.Item onClick={() => setElementSelected(Items.LINE)}>Line</NavDropdown.Item>
          <NavDropdown.Item onClick={() => setElementSelected(Items.RECTANGLE)}>Rectangle</NavDropdown.Item>
          <NavDropdown.Item onClick={() => setElementSelected(Items.CIRCLE)}>Circle</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          title={`Line Width: ${selectedLineWidth}`}
          id="Line-width-dropdown"
          className="px-2 py-1"
        >
          <NavDropdown.Item onClick={() => setSelectedLineWidth(LINE_WIDTHS.SMALL)}>Small</NavDropdown.Item>
          <NavDropdown.Item onClick={() => setSelectedLineWidth(LINE_WIDTHS.MEDIUM)}>Medium</NavDropdown.Item>
          <NavDropdown.Item onClick={() => setSelectedLineWidth(LINE_WIDTHS.LARGE)}>Large</NavDropdown.Item>
        </NavDropdown>
      </div>
      <div id="item-color" className="pl-2 space-x-2 mt-2">
        {Object.entries(COLORS_PALETE).map(([colorName, colorValue]) => (
          <button
            key={colorName}
            id={colorName.toLowerCase()}
            className={`p-3 rounded-xl`}
            style={{ backgroundColor: colorValue }}
            onClick={() => setLineColor(colorValue)}
            aria-label={`Select ${colorName} color`}
          ></button>
        ))}
      </div>
    </div>
  );
}
