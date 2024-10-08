import { Camera, Crop, Crosshair, Trash, Type } from "lucide-react";
import { useState } from "react";
import { useGameEditorStore } from "./game-editor-store-provider";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { toast } from "~/hooks/use-toast";
import { ScreenshotButton } from "./ScreenshotButton"; // Add this import

export function InfoInputLogic({
  canBuild,
  onBuild,
}: {
  canBuild: boolean;
  onBuild: () => void;
}) {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [zonePopoverId, setZonePopoverId] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>("");

  const components = useGameEditorStore((state) => state.components);
  const updateComponent = useGameEditorStore((state) => state.updateComponent);
  const addComponent = useGameEditorStore((state) => state.addComponent);
  const removeComponent = useGameEditorStore((state) => state.removeComponent);
  const startSelectingZone = useGameEditorStore(
    (state) => state.startSelectingZone,
  );
  const selectingZoneForComponent = useGameEditorStore(
    (state) => state.selectingZoneForComponent,
  );

  const handleOpenPopover = (id: string, existingText: string) => {
    setOpenPopoverId(id);
    setTextInput(existingText);
  };

  const handleClosePopover = () => {
    setOpenPopoverId(null);
    setTextInput("");
  };

  const handleOpenZonePopover = (id: string) => {
    setZonePopoverId(id);
  };

  const handleCloseZonePopover = () => {
    setZonePopoverId(null);
  };

  const handleSubmitText = (id: string) => {
    const success = updateComponent(id, { context: textInput });
    if (!success) {
      toast({
        title: "Name already exists",
        description: "Please choose a unique name for the component.",
        variant: "destructive",
      });
    }
    handleClosePopover();
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Component Editor</h2>
      <div className="mb-4 flex space-x-2">
        <Button
          onClick={() => addComponent("ocr")}
          variant="default"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Text
        </Button>
        <Button
          onClick={() => addComponent("movement")}
          variant="default"
          className="bg-green-600 text-white hover:bg-green-700"
        >
          Add Movement
        </Button>
        <Button
          onClick={() => addComponent("sprite")}
          variant="default"
          className="bg-yellow-600 text-white hover:bg-yellow-700"
        >
          Add Sprite
        </Button>
      </div>
      <div className="flex-grow space-y-4 overflow-auto">
        {components.map((component) => (
          <Card key={component.id} className="relative p-4">
            <div
              className="absolute left-2 top-2 h-4 w-4 rounded-full"
              style={{ backgroundColor: component.color }}
            ></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Input
                  value={component.name}
                  onChange={(e) =>
                    updateComponent(component.id, { name: e.target.value })
                  }
                  className="font-semibold"
                />
              </CardTitle>
              <Badge variant="secondary">{component.kind}</Badge>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeComponent(component.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => startSelectingZone(component.id)}
                    disabled={selectingZoneForComponent !== null}
                    size="icon"
                    variant="outline"
                    className="shrink-0"
                    title="Select Area"
                  >
                    <Crosshair className="h-5 w-5" />
                  </Button>
                  <Popover
                    open={zonePopoverId === component.id}
                    onOpenChange={(open) =>
                      open
                        ? handleOpenZonePopover(component.id)
                        : handleCloseZonePopover()
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                        title="Edit Selected Zone"
                      >
                        <Crop className="mr-2 h-5 w-5" />
                        <span>Edit Zone</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Adjust the dimensions of the zone.
                          </p>
                        </div>
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
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCloseZonePopover}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <ScreenshotButton componentId={component.id} />
                </div>
                <div className="space-y-2">
                  <Popover
                    open={openPopoverId === component.id}
                    onOpenChange={(open) =>
                      open
                        ? handleOpenPopover(
                            component.id,
                            component.context || "",
                          )
                        : handleClosePopover()
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border border-gray-300 hover:bg-gray-100"
                      >
                        <Type className="mr-2 h-4 w-4" />{" "}
                        {!!component.context.trim() ? "Edit" : "Add"} Context
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Add Context
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Describe the context of this component.
                          </p>
                        </div>
                        <Textarea
                          placeholder="Enter text here..."
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            onClick={handleClosePopover}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleSubmitText(component.id)}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          disabled={!canBuild}
          onClick={onBuild}
          variant="default"
          className="px-8 py-4 text-lg font-bold"
        >
          Build
        </Button>
      </div>
    </div>
  );
}
