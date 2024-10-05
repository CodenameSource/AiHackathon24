"use client";

import dynamic from "next/dynamic";

const Dino = dynamic(() => import("./Dino"), { ssr: false });

export default function DinoPage() {
  return <Dino hideInstructions={true} />;
}
