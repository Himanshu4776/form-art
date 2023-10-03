import { useEffect, useState } from "react";
import { Draw } from "./Components/draw";
import { ToolBox } from "./Components/toolbox";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000');

  const [messageHistory, setMessageHistory] = useState([]);


  return (
    <>
      <h1 className="text-3xl text-red-500">FormArt Draw App</h1>
      <ToolBox />
      <Draw />
    </>
  );
}

export default App;
