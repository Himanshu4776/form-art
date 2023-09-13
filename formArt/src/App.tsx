import { Draw } from "./Components/draw";
import { ToolBox } from "./Components/toolbox";

function App() {
  return (
    <>
      <h1 className="text-3xl text-red-500">FormArt Draw App</h1>
      <ToolBox />
      <Draw />
    </>
  );
}

export default App;
