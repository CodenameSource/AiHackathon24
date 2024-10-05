"use client";

import { createContext, useContext, useRef } from "react";
import { StoreApi, UseBoundStore, useStore } from "zustand";
import {
  createGameEditorStore,
  GameEditorStore,
} from "~/stores/game-editor-store";

const GameEditorStoreContext = createContext<ReturnType<
  typeof createGameEditorStore
> | null>(null);

export function GameEditorStoreProvider({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  const storeRef = useRef<ReturnType<typeof createGameEditorStore>>();

  if (!storeRef.current) {
    storeRef.current = createGameEditorStore({
      link,
      transportUrl: "ws://localhost:8765",
    });
  }

  return (
    <GameEditorStoreContext.Provider value={storeRef.current}>
      {children}
    </GameEditorStoreContext.Provider>
  );
}

type Selector<U> = Parameters<
  typeof useStore<UseBoundStore<StoreApi<GameEditorStore>>, U>
>[1];

export function useGameEditorStore<U>(selector: Selector<U>) {
  const store = useContext(GameEditorStoreContext);
  if (!store) {
    throw new Error(
      "useGameEditorStore must be used within a GameEditorStoreProvider",
    );
  }
  return useStore(store, selector);
}
