import { Paintbrush } from "lucide-react";
import { Draw } from "./draw";
import { ToolBox } from "./toolbox";

export function Home() {
    return (
        <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <a href="/" className="flex items-center justify-center">
          <Paintbrush className="h-6 w-6 mr-2 text-indigo-600" />
          <span className="font-bold text-indigo-600">FormArt Draw</span>
        </a>
      </header>
      <main className="flex-1 overflow-hidden">
        <ToolBox />
        <Draw />
      </main>
    </div>
    );
}