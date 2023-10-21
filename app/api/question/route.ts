import { prisma } from "@/lib/db.utils";
import { getUser } from "@/lib/query.utils";
import { currentUser } from "@clerk/nextjs";
import { qa } from "@/lib/ai.utils";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = (await request.json()) as { question: string };

  const currentUserInClerk = await currentUser();

  if (currentUserInClerk === null) {
    console.log("Not authed");
    return null;
  }

  const user = await getUser(currentUserInClerk.id);

  if (user === null) {
    console.log("user not found");
    return null;
  }

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const answer = await qa(question, entries);

  return NextResponse.json({ data: answer });
};
