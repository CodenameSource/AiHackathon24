import { create } from "zustand";
import { Component } from "~/lib/transport";

export interface GameEditorStore {
  components: Component[];
  addComponent: (kind: Component["kind"]) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<Component>) => boolean;
}

export function createGameEditorStore() {
  return create<GameEditorStore>((set, get) => ({
    components: [],
    addComponent: (kind) =>
      set((state) => ({
        components: [
          ...state.components,
          {
            id: Date.now().toString(),
            kind,
            context: `New ${kind}`,
            zone: { x: 0, y: 0, width: 100, height: 100 },
          },
        ],
      })),
    removeComponent: (id) =>
      set((state) => ({
        components: state.components.filter((c) => c.id !== id),
      })),
    updateComponent: (id, updates) => {
      const isNameUnique = (context: string, currentId: string): boolean => {
        return !get().components.some(
          (c) => c.context === context && c.id !== currentId,
        );
      };

      if (
        "context" in updates &&
        !isNameUnique(updates.context as string, id)
      ) {
        return false;
      }

      set((state) => ({
        components: state.components.map((c) =>
          c.id === id ? { ...c, ...updates } : c,
        ),
      }));
      return true;
    },
  }));
}
