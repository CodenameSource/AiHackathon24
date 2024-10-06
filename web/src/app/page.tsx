import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";

const baseUrl = process.env.VERCEL_URL
  ? `https://ai-hackathon-gym-environments.vercel.app`
  : "http://localhost:3000";

const gameLinks = [
  `${baseUrl}/vendor/dino/index.html`,
  `${baseUrl}/vendor/flappy-bird/index.html`,
];

export default function GameEditorStartMenu() {
  return (
    <Card className="mx-auto mt-20 w-full max-w-md">
      <CardHeader>
        <CardTitle>Game Editor</CardTitle>
        <CardDescription>Enter a game link to begin editing</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/editor" method="get" className="space-y-4">
          <Input
            type="url"
            name="link"
            placeholder="Enter your game link here"
            defaultValue={gameLinks[0]}
            autoFocus
            required
          />
          <Button type="submit" className="w-full">
            Open in Editor
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
