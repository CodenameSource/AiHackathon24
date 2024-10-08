import { redirect } from "next/navigation";
import { GameEditorComponent } from "~/components/game-editor";
import dynamic from "next/dynamic";
import { ComponentSelectionOverlay } from "~/components/component-selection-overlay";

const GameEditorStoreProvider = dynamic(
  () =>
    import("~/components/game-editor-store-provider").then(
      (mod) => mod.GameEditorStoreProvider,
    ),
  {
    ssr: false,
  },
);

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
      <ComponentSelectionOverlay>
        <GameEditorComponent />
      </ComponentSelectionOverlay>
    </GameEditorStoreProvider>
  );
}
