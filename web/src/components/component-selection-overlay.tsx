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
  const components = useGameEditorStore((state) => state.components);
  const selectingZoneForComponent = useGameEditorStore(
    (state) => state.selectingZoneForComponent,
  );
  const cancelSelectingZone = useGameEditorStore(
    (state) => state.cancelSelectingZone,
  );
  const updateSelectingZone = useGameEditorStore(
    (state) => state.updateSelectingZone,
  );
  const canvasTopLeft = useGameEditorStore((state) => state.canvasTopLeft);

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
    if (!selectingZoneForComponent || !topLeft || !bottomRight) {
      return;
    }

    const canvasX = canvasTopLeft?.x ?? 0;
    const canvasY = canvasTopLeft?.y ?? 0;

    updateSelectingZone({
      x: topLeft.x - canvasX,
      y: topLeft.y - canvasY,
      width: bottomRight.x - topLeft.x,
      height: bottomRight.y - topLeft.y,
    });

    setEndPoint(null);
    setStartPoint(null);
  };

  const currentColor = useMemo(() => {
    if (!selectingZoneForComponent) {
      return "#000000";
    }
    return components.find((c) => c.id === selectingZoneForComponent)?.color;
  }, [selectingZoneForComponent, components]);

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
      {/* The overlay rect */}
      {selectingZoneForComponent && topLeft && bottomRight && (
        <div
          className="absolute inset-0 z-50 cursor-crosshair border-4"
          style={{
            top: topLeft.y,
            left: topLeft.x,
            width: bottomRight.x - topLeft.x,
            height: bottomRight.y - topLeft.y,
            borderColor: currentColor,
            backgroundColor: `${currentColor}99`, // 60% opacity (hex alpha)
          }}
        ></div>
      )}
      {/* all existing component zones (if they are present) */}
      {components
        .filter((c) => c.id !== selectingZoneForComponent)
        .map(
          (component) =>
            component.zone &&
            canvasTopLeft && (
              <div
                key={component.id}
                className="absolute inset-0 z-50 cursor-crosshair border-2"
                style={{
                  top: component.zone.y + canvasTopLeft.y,
                  left: component.zone.x + canvasTopLeft.x,
                  width: component.zone.width,
                  height: component.zone.height,
                  borderColor: component.color,
                  backgroundColor: `${component.color}66`,
                }}
              ></div>
            ),
        )}
      {children}
    </div>
  );
};
