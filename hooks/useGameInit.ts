"use client";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";

export function useGameInit(slug: string) {
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<any>(null);
  const [isCreator, setIsCreator] = useState(false);
  const { setGameDetails } = useGameStore();

  useEffect(() => {
    async function initGame() {
      const storedToken = localStorage.getItem("game_token");
      const storedUsername = localStorage.getItem("game_username");

      setGameDetails({ slug, token: storedToken, username: storedUsername });

      // Step 1: Verify owner
      const res = await fetch("/api/verify-owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, token: storedToken || null }),
      });
      const data = await res.json();

      if (data.isOwner) {
        setIsCreator(true);
        setGame(data.game);
      } else {
        // Step 2: Fetch game normally
        const gameRes = await fetch(`/api/play/${slug}`);
        const gameData = await gameRes.json();
        setGame(gameData);
        setIsCreator(false);
      }

      setLoading(false);
    }

    initGame();
  }, [slug, setGameDetails]);

  return { loading, game, isCreator };
}
