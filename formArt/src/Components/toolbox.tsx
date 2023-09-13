import { useAtom } from "jotai";
import { tool } from "../shared/constants";

export function ToolBox() {
  const [, setSelectedTool] = useAtom(tool);
  return (
    <div>
      <button
        onClick={() => {
          setSelectedTool(1);
        }}
      >
        Pencil
      </button>
      <button
        onClick={() => {
          setSelectedTool(2);
        }}
      >
        Shape box
      </button>
    </div>
  );
}
