

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { v4 as uuidv4 } from "uuid";
// import crypto from "crypto";

// export async function POST(req: Request) {
//   try {
//     const { creatorName, questions } = await req.json();

//     if (!creatorName || !questions?.length) {
//       return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//     }

//     const slug = `${creatorName.toLowerCase()}-${uuidv4().slice(0, 6)}`;

//     // 🔒 Generate a secure token for verifying owner
//     const ownerToken = crypto.randomBytes(16).toString("hex");

//     // ✅ Create the game record
//     const game = await prisma.game.create({
//       data: {
//         creatorName,
//         slug,
//         ownerToken, // store the owner token in DB
//         questions,
//       },
//     });

//     // 🧠 Return slug + token so creator can be verified later
//     return NextResponse.json({
//       slug: game.slug,
//       token: ownerToken,
//     });
//   } catch (err) {
//     console.error("Error creating game:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { creatorName, questions } = await req.json();

    if (!creatorName || !questions?.length) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const slug = `${creatorName.toLowerCase()}-${uuidv4().slice(0, 6)}`;
    const ownerToken = crypto.randomBytes(16).toString("hex");

    await prisma.game.create({
      data: {
        creatorName,
        slug,
        ownerToken,
        questions,
      },
    });

    return NextResponse.json({ slug, token: ownerToken });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
