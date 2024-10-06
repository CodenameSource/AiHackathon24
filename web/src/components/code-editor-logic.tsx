import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Play, Upload } from "lucide-react"; // Import icons
import { useGameEditorStore } from "./game-editor-store-provider";
import { toast } from "~/hooks/use-toast";

export function CodeEditorLogic() {
  const code = useGameEditorStore((state) => state.generatedCode);

  const handleCompile = () => {
    console.log("Compiling code:", code);
    toast({
      title: "Code Compiled",
      description: "Your code has been successfully compiled.",
    });
  };

  const handleExport = () => {
    console.log("Exporting code:", code);
    toast({
      title: "Code Exported",
      description: "Your code has been successfully exported.",
    });
  };

  return (
    <div className="flex h-3/4 flex-col p-4 text-gray-100">
      <h2 className="mb-4 text-2xl font-bold text-gray-100">Code Editor</h2>
      <div className="flex flex-grow flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 p-2 text-gray-200">
          <span>environment.py</span>
          <div className="flex space-x-2">
            <Button
              onClick={handleCompile}
              size="sm"
              className="flex items-center space-x-1 bg-gray-700 text-white hover:bg-gray-600"
            >
              <Play className="h-4 w-4" /> {/* Compile Icon */}
              <span>Compile</span>
            </Button>
            <Button
              onClick={handleExport}
              size="sm"
              className="flex items-center space-x-1 bg-gray-700 text-white hover:bg-gray-600"
            >
              <Upload className="h-4 w-4" /> {/* Export Icon */}
              <span>Export</span>
            </Button>
          </div>
        </div>
        <textarea
          value={code ?? ""}
          className="flex-grow resize-none bg-gray-900 p-4 font-mono text-sm text-gray-100 focus:outline-none"
          style={{ lineHeight: "1.5", tabSize: 2, cursor: "text" }}
        />
      </div>
    </div>
  );
}
