import { currentUser } from "@clerk/nextjs";

import { getUser } from "@/lib/query.utils";
import { prisma } from "@/lib/db.utils";
import { NextResponse } from "next/server";
import { analyze } from "@/lib/ai.utils";
import { revalidatePath } from "next/cache";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
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

  const { content } = await request.json();
  const analysis = await analyze(content);

  const updatedEntry = await prisma.journalEntry.update({
    data: {
      content,
      analysis: {
        upsert: {
          create: { ...analysis, userId: user.id },
          update: { ...analysis, userId: user.id },
        },
      },
    },
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    include: {
      analysis: true,
    },
  });

  revalidatePath(`/journal/${updatedEntry.id}`);

  return NextResponse.json({ data: updatedEntry });
};
