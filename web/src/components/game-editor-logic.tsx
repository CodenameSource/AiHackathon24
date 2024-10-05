// GameEditorLogic.tsx

import { useCallback, useEffect, useState } from "react";
import { useGameEditorStore } from "~/components/game-editor-store-provider";
import { toast } from "~/hooks/use-toast";

export enum EditorState {
  ComponentEditor,
  CodeEditor,
}

type ComponentKind = "ocr" | "movement" | "sprite";

export function useGameEditorLogic() {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.ComponentEditor,
  );
  const [code, setCode] = useState(
    "// Your game code here\n\nfunction gameLogic() {\n  // Add your game logic\n}\n\n// Start the game\ngameLogic();",
  );
  const [isGameStarted, setIsGameStarted] = useState(false);

  const components = useGameEditorStore((state) => state.components);
  const addComponent = useGameEditorStore((state) => state.addComponent) as (kind: ComponentKind) => void;
  const removeComponent = useGameEditorStore((state) => state.removeComponent);
  const updateComponent = useGameEditorStore((state) => state.updateComponent);
  const link = useGameEditorStore((state) => state.link);
  const setIFrameElement = useGameEditorStore(
    (state) => state.setIFrameElement,
  );
  const sendKeyboardEvent = useGameEditorStore(
    (state) => state.sendKeyboardEvent,
  );

  const handleNameChange = (id: string, newContext: string) => {
    const success = updateComponent(id, { context: newContext });
    if (!success) {
      toast({
        title: "Name already exists",
        description: "Please choose a unique name for the component.",
        variant: "destructive",
      });
    }
  };

  const handleBuild = () => {
    console.log("Building with components:", components);
    setEditorState(EditorState.CodeEditor);
  };

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

  const handleStartGame = () => {
    setIsGameStarted(!isGameStarted);
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
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.removeEventListener("keydown", sendKeyboardEvent);
        iframe.contentWindow.removeEventListener("keyup", sendKeyboardEvent);
      }
    };
  }, [sendKeyboardEvent]);

  return {
    editorState,
    setEditorState,
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
  };
}
