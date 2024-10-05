import { Button } from "~/components/ui/button";

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
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-2xl font-bold">Code Editor</h2>
      <div className="flex flex-grow flex-col overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b p-2">
          <span>game.js</span>
          <div className="flex space-x-2">
            <Button onClick={handleCompile} size="sm">
              Compile
            </Button>
            <Button onClick={handleExport} size="sm">
              Export
            </Button>
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-grow resize-none p-4 font-mono text-sm focus:outline-none"
          style={{ lineHeight: "1.5", tabSize: 2 }}
        />
      </div>
    </div>
  );
}
