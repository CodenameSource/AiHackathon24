"use client";

import { cn } from "~/lib/utils";
import { useGameEditorStore } from "~/components/game-editor-store-provider";
import { useEffect } from "react";

export const ComponentSelectionOverlay = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const components = useGameEditorStore((state) => state.components); // TODO: remove this when iva done
  const selectingZoneForComponent = useGameEditorStore(
    (state) => state.selectingZoneForComponent,
  );
  const startSelectingZone = useGameEditorStore(
    (state) => state.startSelectingZone,
  );
  const cancelSelectingZone = useGameEditorStore(
    (state) => state.cancelSelectingZone,
  );

  // global shortcut to start selecting zone on shift + space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.shiftKey &&
        e.key === " " &&
        components.length > 0 &&
        !selectingZoneForComponent
      ) {
        startSelectingZone(components[0]!.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [startSelectingZone, components, selectingZoneForComponent]);

  // global shortcut to cancel selecting zone on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectingZoneForComponent) {
        cancelSelectingZone();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cancelSelectingZone, selectingZoneForComponent]);

  return (
    <div className={cn("relative", className)}>
      {selectingZoneForComponent && (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )}
      {children}
    </div>
  );
};
