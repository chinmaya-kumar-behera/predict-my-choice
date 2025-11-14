"use client";
export default function GameCreatorView({ game }: { game: any }) {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        🏆 Leaderboard for {game.title || game.creatorName}'s Game
      </h1>
      {game.responses?.length > 0 ? (
        <table className="w-full border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">#</th>
              <th className="border p-2">Player</th>
              <th className="border p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {game.responses.map((r: any, i: number) => (
              <tr
                key={r.id}
                className="border text-center hover:bg-gray-50 transition"
              >
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2 font-medium">{r.playerName}</td>
                <td className="border p-2 font-semibold text-green-600">
                  {r.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600 mt-6">
          No one has played yet. Share your link!
        </p>
      )}
    </div>
  );
}
