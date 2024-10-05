import { redirect } from "next/navigation";
import { GameEditorComponent } from "~/components/game-editor";
import { GameEditorStoreProvider } from "~/components/game-editor-store-provider";

export default function EditorPage({
  searchParams,
}: {
  searchParams: {
    link?: string | string[];
  };
}) {
  const gameLink = searchParams.link;
  if (!gameLink || typeof gameLink !== "string") {
    redirect("/");
  }

  return (
    <GameEditorStoreProvider link={gameLink}>
      <GameEditorComponent />
    </GameEditorStoreProvider>
  );
}
