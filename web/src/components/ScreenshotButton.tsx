import { Camera } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useGameEditorStore } from "./game-editor-store-provider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ScreenshotButtonProps {
  componentId: string;
}

export function ScreenshotButton({ componentId }: ScreenshotButtonProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const screenshotComponentZone = useGameEditorStore(
    (state) => state.screenshotComponentZone,
  );

  const handlePopoverOpen = (open: boolean) => {
    if (open) {
      setIsLoading(true);
      void screenshotComponentZone(componentId).then((dataUrl) => {
        setDataUrl(dataUrl);
        setIsLoading(false);
      });
    }
  };

  return (
    <Popover onOpenChange={handlePopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="w-full border border-gray-300 hover:border-gray-400"
        >
          <Camera className="mr-2 h-4 w-4" /> Screenshot
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          {dataUrl ? (
            <img src={dataUrl} alt="Component Screenshot" className="w-full" />
          ) : (
            <p>Loading screenshot...</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
