"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";
import { CodeEditorLogic } from "./code-editor-logic";
import { EditorState } from "./game-editor-logic";
import { useGameEditorStore } from "./game-editor-store-provider";
import { InfoInputLogic } from "./info-input-logic";

export function GameEditorComponent() {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.ComponentEditor,
  );
  const generatedCode = useGameEditorStore((state) => state.generatedCode);
  const link = useGameEditorStore((state) => state.link);
  const setIFrameElement = useGameEditorStore(
    (state) => state.setIFrameElement,
  );
  const sendKeyboardEvent = useGameEditorStore(
    (state) => state.sendKeyboardEvent,
  );

  const isGameplayRunning = useGameEditorStore(
    (state) => state.isGameplayRunning,
  );
  const startGameplay = useGameEditorStore((state) => state.startGameplay);
  const stopGameplay = useGameEditorStore((state) => state.stopGameplay);

  const handleStartGame = () => {
    if (isGameplayRunning) {
      stopGameplay();
    } else {
      startGameplay();
    }
  };

  const handleIframeLoad = useCallback(
    (iframe: HTMLIFrameElement) => {
      if (iframe) {
        setIFrameElement(iframe);

        // Add a click event listener to focus the iframe
        iframe.addEventListener("click", () => {
          iframe.focus();
        });

        // Add event listeners to the iframe's content window
        iframe.contentWindow?.addEventListener("keydown", (e) => {
          e.preventDefault(); // Prevent default behavior
          sendKeyboardEvent(e);
        });
        iframe.contentWindow?.addEventListener("keyup", (e) => {
          e.preventDefault(); // Prevent default behavior
          sendKeyboardEvent(e);
        });

        // Focus the iframe initially
        iframe.focus();
      }
    },
    [setIFrameElement, sendKeyboardEvent],
  );

  useEffect(() => {
    return () => {
      const iframe = document.querySelector("iframe");
      if (iframe?.contentWindow) {
        iframe.contentWindow.removeEventListener("keydown", sendKeyboardEvent);
        iframe.contentWindow.removeEventListener("keyup", sendKeyboardEvent);
      }
    };
  }, [sendKeyboardEvent]);

  return (
    <div className="flex h-screen">
      {/* Game Screen Panel */}
      <div className="flex-1 border-r p-4">
        <h2 className="mb-4 text-2xl font-bold">Game Screen</h2>
        <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center rounded-lg border">
          <iframe
            src={link}
            className="h-full w-full rounded-lg"
            title="Game Content"
            ref={handleIframeLoad}
            tabIndex={0} // Make the iframe focusable
          />
        </div>
        <Button onClick={handleStartGame} className="mt-4 w-full">
          {isGameplayRunning ? "Stop Game" : "Start Game"}
        </Button>
      </div>

      {/* Editor Panel */}
      <div className="flex h-screen w-1/3 flex-col p-4">
        {editorState === EditorState.ComponentEditor && (
          <InfoInputLogic
            canBuild={!!generatedCode}
            onBuild={() => setEditorState(EditorState.CodeEditor)}
          />
        )}
        {editorState === EditorState.CodeEditor && <CodeEditorLogic />}
      </div>
    </div>
  );
}
