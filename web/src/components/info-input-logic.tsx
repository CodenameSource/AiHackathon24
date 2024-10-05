import { Trash, X } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface InfoInputLogicProps {
  components: any[];
  handleNameChange: (id: string, newContext: string) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updatedComponent: any) => void;
  handleBuild: () => void;
  addComponent: (kind: string) => void;
}

export function InfoInputLogic({
  components,
  handleNameChange,
  removeComponent,
  updateComponent,
  handleBuild,
  addComponent,
}: InfoInputLogicProps) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Component Editor</h2>
      <div className="mb-4 flex space-x-2">
        <Button onClick={() => addComponent("ocr")}>Add OCR</Button>
        <Button onClick={() => addComponent("movement")}>Add Movement</Button>
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
              <Button variant="ghost" size="icon" onClick={() => removeComponent(component.id)}>
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
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleBuild} className="mt-4">
        Build
      </Button>
    </div>
  );
}
