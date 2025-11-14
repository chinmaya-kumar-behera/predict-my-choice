"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-300 to-yellow-200 text-center p-4">
      <h1 className="text-4xl font-bold mb-6">🎯 Predict My Choice</h1>
      <p className="mb-6 text-lg">How well do your friends know you?</p>
      <Link
        href="/create"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
      >
        Create Your Game
      </Link>
    </div>
  );
}
