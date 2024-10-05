"use client";

import { cn } from "~/lib/utils";
import { useGameEditorStore } from "~/components/game-editor-store-provider";
import { useEffect, useMemo, useState } from "react";

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
  const updateSelectingZone = useGameEditorStore(
    (state) => state.updateSelectingZone,
  );

  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(
    null,
  );

  const topLeft = useMemo(() => {
    if (!startPoint || !endPoint) {
      return null;
    }
    return {
      x: Math.min(startPoint.x, endPoint.x),
      y: Math.min(startPoint.y, endPoint.y),
    };
  }, [startPoint, endPoint]);

  const bottomRight = useMemo(() => {
    if (!startPoint || !endPoint) {
      return null;
    }
    return {
      x: Math.max(startPoint.x, endPoint.x),
      y: Math.max(startPoint.y, endPoint.y),
    };
  }, [startPoint, endPoint]);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectingZoneForComponent) {
      return;
    }
    setStartPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selectingZoneForComponent) {
      return;
    }
    setEndPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    if (!selectingZoneForComponent) {
      return;
    }
    if (topLeft && bottomRight) {
      updateSelectingZone({
        x: topLeft.x,
        y: topLeft.y,
        width: bottomRight.x - topLeft.x,
        height: bottomRight.y - topLeft.y,
      });
    }
    setEndPoint(null);
    setStartPoint(null);
  };

  return (
    <div
      className={cn("relative", className)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {selectingZoneForComponent && (
        <div className="absolute inset-0 z-50 cursor-crosshair bg-black opacity-50"></div>
      )}
      {children}
    </div>
  );
};
