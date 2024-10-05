import { useState } from 'react';
import { Trash, Camera, Type, Crop, Crosshair } from "lucide-react";
import * as React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

interface InfoInputLogicProps {
  components: any[];
  handleNameChange: (id: string, newContext: string) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updatedComponent: any) => void;
  handleBuild: () => void;
  addComponent: (kind: string) => void;
  handleSelectArea: (id: string) => void;
  handleScreenshot: (id: string) => void;
  handleAddText: (id: string, text: string) => void;
}

export function InfoInputLogic({
  components,
  handleNameChange,
  removeComponent,
  updateComponent,
  handleBuild,
  addComponent,
  handleSelectArea,
  handleScreenshot,
  handleAddText,
}: InfoInputLogicProps) {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [zonePopoverId, setZonePopoverId] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>('');

  const handleOpenPopover = (id: string, existingText: string) => {
    setOpenPopoverId(id);
    setTextInput(existingText);
  };

  const handleClosePopover = () => {
    setOpenPopoverId(null);
    setTextInput('');
  };

  const handleOpenZonePopover = (id: string) => {
    setZonePopoverId(id);
  };

  const handleCloseZonePopover = () => {
    setZonePopoverId(null);
  };

  const handleSubmitText = (id: string) => {
    console.log("Text Submitted for Component ID:", id, "Text:", textInput);
    handleAddText(id, textInput);
    handleClosePopover();
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Component Editor</h2>
      <div className="mb-4 flex space-x-2">
        <Button
          onClick={() => addComponent("ocr")}
          variant="default"
          className="text-white bg-blue-600 hover:bg-blue-700"
        >
          Add OCR
        </Button>
        <Button
          onClick={() => addComponent("movement")}
          variant="default"
          className="text-white bg-green-600 hover:bg-green-700"
        >
          Add Movement
        </Button>
        <Button
          onClick={() => addComponent("sprite")}
          variant="default"
          className="text-white bg-yellow-600 hover:bg-yellow-700"
        >
          Add Sprite
        </Button>
      </div>
      <div className="flex-grow space-y-4 overflow-auto">
        {components.map((component) => (
          <Card key={component.id} className="relative p-4">
            <div
              className={`absolute top-2 left-2 h-4 w-4 rounded-full ${
                component.kind === "ocr"
                  ? "bg-blue-500"
                  : component.kind === "movement"
                  ? "bg-green-500"
                  : component.kind === "sprite"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            ></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Input
                  value={component.context}
                  onChange={(e) =>
                    handleNameChange(component.id, e.target.value)
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
                  <Popover
                    open={zonePopoverId === component.id}
                    onOpenChange={(open) =>
                      open ? handleOpenZonePopover(component.id) : handleCloseZonePopover()
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-blue-600 hover:bg-blue-100"
                        title="Edit Selected Zone"
                      >
                        <Crop className="h-5 w-5" />
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
                                zone: { ...component.zone, x: parseInt(e.target.value) },
                              })
                            }
                            placeholder="X"
                          />
                          <Input
                            type="number"
                            value={component.zone.y}
                            onChange={(e) =>
                              updateComponent(component.id, {
                                zone: { ...component.zone, y: parseInt(e.target.value) },
                              })
                            }
                            placeholder="Y"
                          />
                          <Input
                            type="number"
                            value={component.zone.width}
                            onChange={(e) =>
                              updateComponent(component.id, {
                                zone: { ...component.zone, width: parseInt(e.target.value) },
                              })
                            }
                            placeholder="Width"
                          />
                          <Input
                            type="number"
                            value={component.zone.height}
                            onChange={(e) =>
                              updateComponent(component.id, {
                                zone: { ...component.zone, height: parseInt(e.target.value) },
                              })
                            }
                            placeholder="Height"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={handleCloseZonePopover}>
                            Close
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button
                    onClick={() => handleSelectArea(component.id)}
                    size="icon"
                    variant="outline"
                    className="text-green-600 hover:bg-green-100"
                    title="Select Area"
                  >
                    <Crosshair className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={() => handleScreenshot(component.id)}
                    variant="ghost"
                    className="w-full border border-gray-300 hover:border-gray-400"
                  >
                    <Camera className="mr-2 h-4 w-4" /> Screenshot
                  </Button>
                </div>
                <div className="space-y-2">
                  <Popover
                    open={openPopoverId === component.id}
                    onOpenChange={(open) =>
                      open
                        ? handleOpenPopover(component.id, component.text || '')
                        : handleClosePopover()
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full border border-gray-300 hover:bg-gray-100">
                        <Type className="mr-2 h-4 w-4" /> Add Context
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Add Context</h4>
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
                          <Button variant="outline" onClick={handleClosePopover}>
                            Cancel 
                          </Button>
                          <Button onClick={() => handleSubmitText(component.id)}>Add</Button>
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
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleBuild}
          variant="default"
          className="px-8 py-4 text-lg font-bold"
        >
          Build
        </Button>
      </div>
    </div>
  );
}
