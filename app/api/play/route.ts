import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { slug, playerName : friendName, answers } = await req.json();

  const game = await prisma.game.findUnique({ where: { slug } });
  if (!game)
    return NextResponse.json({ error: "Game not found" }, { status: 404 });

  const correct = (game.questions as any[]).map((q) => q.answer);

  let score = 0;
  Object.values(answers).forEach((a: any, i: number) => {
    if (a === correct[i]) score++;
  });

  await prisma.response.create({
    data: {
      friendName,
      answers,
      score,
      gameId: game.id,
    },
  });

  return NextResponse.json({ score });
}
