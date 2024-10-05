"use client";

import { useGameEditorLogic } from "./game-editor-logic";
import { InfoInputLogic } from "./info-input-logic";
import { CodeEditorLogic } from "./code-editor-logic";
import { Button } from "~/components/ui/button";
import { EditorState } from "./game-editor-logic";

export function GameEditorComponent() {
  const {
    editorState,
    code,
    setCode,
    isGameStarted,
    components,
    handleNameChange,
    handleBuild,
    handleCompile,
    handleExport,
    handleStartGame,
    handleIframeLoad,
    addComponent,
    removeComponent,
    updateComponent,
    link,
  } = useGameEditorLogic();

  return (
    <div className="flex h-screen">
      <div className="flex-1 border-r p-4">
        <h2 className="mb-4 text-2xl font-bold">Game Screen</h2>
        <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center rounded-lg border">
          <iframe
            src={link}
            className="h-full w-full rounded-lg"
            title="Game Content"
            ref={handleIframeLoad}
            tabIndex={0}
          />
        </div>
        <Button onClick={handleStartGame} className="mt-4 w-full">
          {isGameStarted ? "Stop Game" : "Start Game"}
        </Button>
      </div>
      <div className="flex h-screen w-1/3 flex-col p-4">
        {editorState === EditorState.ComponentEditor && (
          <InfoInputLogic
            components={components}
            handleNameChange={handleNameChange}
            removeComponent={removeComponent}
            updateComponent={updateComponent}
            handleBuild={handleBuild}
            addComponent={addComponent as (kind: string) => void}
          />
        )}
        {editorState === EditorState.CodeEditor && (
          <CodeEditorLogic
            code={code}
            setCode={setCode}
            handleCompile={handleCompile}
            handleExport={handleExport}
          />
        )}
      </div>
    </div>
  );
}
