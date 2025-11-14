"use client";
import { useState } from "react";


export default function GamePlayerView({
  game,
  slug,
  onSubmitSuccess,
}: {
  game: any;
  slug: string;
  onSubmitSuccess: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleChange = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const playerName = (e.target as any).player.value.trim();
    if (!playerName) return alert("Enter your name");

    localStorage.setItem("game_username", playerName);

    // ✅ dynamic payload
    const payload = {
      slug,
      friendName: playerName,
      answers: Object.values(answers),
    };

    const res = await fetch("/api/play", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) onSubmitSuccess();
    else alert("Error submitting your answers");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{game.title}</h1>
      <p className="text-gray-600 mb-6">{game.description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="player"
          placeholder="Enter your name"
          required
          className="border rounded p-3 w-full focus:ring focus:ring-blue-300"
        />

        {game.questions?.map((q: any, index: number) => (
          <div
            key={q.id}
            className="p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <p className="font-semibold mb-2">
              {index + 1}. {q.text}
            </p>
            <div className="space-y-1">
              {q.options.map((opt: string) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt}
                    onChange={() => handleChange(q.id, opt)}
                    required
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full font-semibold"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
}
