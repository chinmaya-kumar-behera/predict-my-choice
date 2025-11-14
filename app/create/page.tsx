"use client";

import { useState } from "react";
import QUESTIONS from "../../constant/question.json";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState(QUESTIONS);

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    // Prepare data for creation
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creatorName: name, questions }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Something went wrong");
      return;
    }

    // ✅ Store slug + token locally for verification
    localStorage.setItem("game_username", name);
    localStorage.setItem("game_token", data.token);
    localStorage.setItem("game_slug", data.slug);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Your Game</h2>

      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {questions.map((q, i) => (
        <div key={i} className="mb-4 border-b pb-3">
          <p className="font-semibold mb-1">{q.q}</p>
          {q.options.map((opt) => (
            <label key={opt} className="block cursor-pointer">
              <input
                type="radio"
                name={`q-${i}`}
                onChange={() => {
                  const copy = [...questions];
                  copy[i].answer = opt;
                  setQuestions(copy);
                }}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleCreate}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-2"
      >
        Generate Link
      </button>
    </div>
  );
}
