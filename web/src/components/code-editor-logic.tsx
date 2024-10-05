import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Play, Upload } from "lucide-react";  // Import icons

interface CodeEditorLogicProps {
  code: string;
  setCode: (value: string) => void;
  handleCompile: () => void;
  handleExport: () => void;
}

export function CodeEditorLogic({
  code,
  setCode,
  handleCompile,
  handleExport,
}: CodeEditorLogicProps) {
  return (
    <div className="flex h-3/4 flex-col text-gray-100 p-4">
      <h2 className="mb-4 text-2xl font-bold text-gray-100">Code Editor</h2>
      <div className="flex flex-grow flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-700 p-2 bg-gray-800 text-gray-200">
          <span>game.js</span>
          <div className="flex space-x-2">
            <Button onClick={handleCompile} size="sm" className="bg-gray-700 text-white hover:bg-gray-600 flex items-center space-x-1">
              <Play className="h-4 w-4" /> {/* Compile Icon */}
              <span>Compile</span>
            </Button>
            <Button onClick={handleExport} size="sm" className="bg-gray-700 text-white hover:bg-gray-600 flex items-center space-x-1">
              <Upload className="h-4 w-4" /> {/* Export Icon */}
              <span>Export</span>
            </Button>
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-grow resize-none p-4 font-mono text-sm focus:outline-none bg-gray-900 text-gray-100"
          style={{ lineHeight: "1.5", tabSize: 2, cursor: "text" }}
        />
      </div>
    </div>
  );
}

// Sample usage
export function ParentComponent() {
  const [code, setCode] = useState<string>(
    `// Basic JavaScript example\n\nfunction startGame() {\n  console.log("Game has started!");\n  // Your game logic here\n}\n\nstartGame();`
  );

  const handleCompile = () => {
    console.log("Compiling code...");
  };

  const handleExport = () => {
    console.log("Exporting code...");
  };

  return (
    <CodeEditorLogic
      code={code}
      setCode={setCode}
      handleCompile={handleCompile}
      handleExport={handleExport}
    />
  );
}
