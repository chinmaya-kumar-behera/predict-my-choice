// app/api/verify-owner/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { slug, token } = await req.json();
  if (!slug || !token) return NextResponse.json({ isOwner: false });

  const game = await prisma.game.findUnique({
    where: { slug },
  });

  if (!game) return NextResponse.json({ isOwner: false });

  const isOwner = game.ownerToken === token;

  if (!isOwner) {
    return NextResponse.json({ isOwner: false, game: null });
  }

  // 👉 Owner verified → send leaderboard only
  const leaderBoard = await prisma.response.findMany({
    where: { gameId: game.id },
    orderBy: { score: "desc" },
    select: {
      id: true,
      friendName: true,
      score: true,
      createdAt: true
    }
  });

  return NextResponse.json({
    isOwner: true,
    game: {
      slug: game.slug,
      creatorName: game.creatorName,
      createdAt: game.createdAt,
      responses: leaderBoard,
    }
  });
}
