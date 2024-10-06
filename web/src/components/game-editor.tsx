"use client";

import { Trash, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useGameEditorStore } from "~/components/game-editor-store-provider";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/hooks/use-toast";

enum EditorState {
  ComponentEditor,
  CodeEditor,
}

export function GameEditorComponent() {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.ComponentEditor,
  );
  const code = useGameEditorStore((state) => state.generatedCode);

  const components = useGameEditorStore((state) => state.components);
  const addComponent = useGameEditorStore((state) => state.addComponent);
  const removeComponent = useGameEditorStore((state) => state.removeComponent);
  const updateComponent = useGameEditorStore((state) => state.updateComponent);
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
      <div className="flex h-screen w-1/3 flex-col p-4">
        {editorState === EditorState.ComponentEditor && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Component Editor</h2>
            <div className="mb-4 flex space-x-2">
              <Button onClick={() => addComponent("ocr")}>Add OCR</Button>
              <Button onClick={() => addComponent("movement")}>
                Add Movement
              </Button>
              <Button onClick={() => addComponent("sprite")}>Add Sprite</Button>
            </div>
            <div className="flex-grow space-y-4 overflow-auto">
              {components.map((component) => (
                <div key={component.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={component.context}
                        onChange={(e) =>
                          handleNameChange(component.id, e.target.value)
                        }
                        className="font-semibold"
                      />
                      <Badge>{component.kind}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeComponent(component.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Zone</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={component.zone.x}
                        onChange={(e) =>
                          updateComponent(component.id, {
                            zone: {
                              ...component.zone,
                              x: parseInt(e.target.value),
                            },
                          })
                        }
                        placeholder="X"
                      />
                      <Input
                        type="number"
                        value={component.zone.y}
                        onChange={(e) =>
                          updateComponent(component.id, {
                            zone: {
                              ...component.zone,
                              y: parseInt(e.target.value),
                            },
                          })
                        }
                        placeholder="Y"
                      />
                      <Input
                        type="number"
                        value={component.zone.width}
                        onChange={(e) =>
                          updateComponent(component.id, {
                            zone: {
                              ...component.zone,
                              width: parseInt(e.target.value),
                            },
                          })
                        }
                        placeholder="Width"
                      />
                      <Input
                        type="number"
                        value={component.zone.height}
                        onChange={(e) =>
                          updateComponent(component.id, {
                            zone: {
                              ...component.zone,
                              height: parseInt(e.target.value),
                            },
                          })
                        }
                        placeholder="Height"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={handleBuild} className="mt-4">
              Build
            </Button>
          </div>
        )}
        {editorState === EditorState.CodeEditor && (
          <div className="flex h-full flex-col">
            <h2 className="mb-4 text-2xl font-bold">Code Editor</h2>
            <div className="flex flex-grow flex-col overflow-hidden rounded-lg border">
              <div className="flex items-center justify-between border-b p-2">
                <span>environment.py</span>
                <div className="flex space-x-2">
                  <Button onClick={handleCompile} size="sm">
                    Train
                  </Button>
                  <Button onClick={handleExport} size="sm">
                    Export
                  </Button>
                </div>
              </div>
              <textarea
                value={code ?? ""}
                className="flex-grow resize-none p-4 font-mono text-sm focus:outline-none"
                style={{ lineHeight: "1.5", tabSize: 2 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
