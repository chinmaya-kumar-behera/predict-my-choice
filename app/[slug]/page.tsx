"use client";

import React, { useEffect, useState } from "react";

export default function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCreator, setIsCreator] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("game_token");

      if (token) {
        const res = await fetch("/api/verify-owner", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, token }),
        });

        const data = await res.json();

        if (data.isOwner) {
          setIsCreator(true);
          setGame(data.game);
          setLoading(false);
          return;
        }
      }

      // Get game without answers
      const res = await fetch(`/api/game/${slug}`);
      const data = await res.json();

      setGame(data);
      setLoading(false);
    }

    init();
  }, [slug]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const playerName = e.target.player.value.trim();
    if (!playerName) return alert("Enter name");

    const res = await fetch("/api/play", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, playerName, answers }),
    });

    if (res.ok) setSubmitted(true);
  };

  if (loading) return <p>Loading...</p>;
  if (!game) return <p>Game not found.</p>;

  // Creator view
  if (isCreator) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        {game.responses.map((r: any, i: number) => (
          <p key={i}>
            {r.playerName}: {r.score}
          </p>
        ))}
      </div>
    );
  }

  // Player view
  if (!submitted) {
    return (
      <div className="p-8">
        <h1 className="text-2xl">{game.creatorName}'s Game</h1>

        <form onSubmit={handleSubmit}>
          <input name="player" placeholder="Your Name" required />

          {game.questions.map((q: any) => (
            <div key={q.id}>
              <p>{q.text}</p>
              {q.options.map((opt: string) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                    }
                    required
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  // After submitting
  return <p>Thanks for playing!</p>;
}
