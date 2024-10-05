import { GameEditorComponent } from "~/components/game-editor";
import { GameEditorStoreProvider } from "~/components/game-editor-store-provider";

export default function HomePage() {
  return (
    <GameEditorStoreProvider>
      <GameEditorComponent />
    </GameEditorStoreProvider>
  );
}
