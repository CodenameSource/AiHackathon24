"use client";

import { useEffect, useState } from "react";
import { useGameEditorStore } from "~/components/game-editor-store-provider";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/hooks/use-toast";

enum EditorState {
  LinkInput,
  ComponentEditor,
  CodeEditor,
}

export function GameEditorComponent() {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.LinkInput,
  );
  const [link, setLink] = useState("");
  const [code, setCode] = useState(
    "// Your game code here\n\nfunction gameLogic() {\n  // Add your game logic\n}\n\n// Start the game\ngameLogic();",
  );
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [backendActions, setBackendActions] = useState<string[]>([]);

  const components = useGameEditorStore((state) => state.components);
  const addComponent = useGameEditorStore((state) => state.addComponent);
  const removeComponent = useGameEditorStore((state) => state.removeComponent);
  const updateComponent = useGameEditorStore((state) => state.updateComponent);

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

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (link.trim() === "") {
      toast({
        title: "Invalid Link",
        description: "Please enter a valid link before submitting.",
        variant: "destructive",
      });
      return;
    }
    console.log("Link submitted:", link);
    setEditorState(EditorState.ComponentEditor);
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

  // Simulating backend actions
  useEffect(() => {
    if (!isGameStarted) {
      const interval = setInterval(() => {
        setBackendActions((prev) => [
          ...prev,
          `Action at ${new Date().toLocaleTimeString()}`,
        ]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isGameStarted]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 border-r p-4">
        <h2 className="mb-4 text-2xl font-bold">Game Screen</h2>
        <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center rounded-lg border">
          {isGameStarted ? (
            <iframe
              src={link}
              className="h-full w-full rounded-lg"
              title="Game Content"
            />
          ) : (
            <div className="p-4 text-center">
              <h3 className="mb-2 text-xl font-semibold">Backend Actions</h3>
              <div className="h-64 overflow-y-auto rounded border p-2">
                {backendActions.map((action, index) => (
                  <p key={index} className="text-sm">
                    {action}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button onClick={handleStartGame} className="mt-4 w-full">
          {isGameStarted ? "Stop Game" : "Start Game"}
        </Button>
      </div>
      <div className="flex h-screen w-1/3 flex-col p-4">
        {editorState === EditorState.LinkInput && (
          <form onSubmit={handleLinkSubmit}>
            <h2 className="mb-4 text-2xl font-bold">Enter Link</h2>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter link here"
              className="mb-4"
            />
            <Button type="submit">Submit</Button>
          </form>
        )}
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
                      size="sm"
                      onClick={() => removeComponent(component.id)}
                    >
                      Remove
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
        )}
      </div>
    </div>
  );
}
