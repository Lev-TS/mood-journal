import { Analysis } from "@prisma/client";
import { prisma } from "./db.utils";
import type { CreateUserArgs, CreateJournalEntryArgs } from "./mutation.types";
import { analyze } from "./ai.utils";

export const createUser = async ({ clerkId, email }: CreateUserArgs) => {
  return await prisma.user.create({
    data: {
      clerkId,
      email,
    },
  });
};

export const createJournalEntry = async ({
  userId,
  content = "",
}: CreateJournalEntryArgs) => {
  return await prisma.journalEntry.create({
    data: {
      userId,
      content,
    },
  });
};

export const createAnalysis = async (
  entryId: string,
  analysis: Awaited<ReturnType<typeof analyze>>
) => {
  return await prisma.analysis.create({
    data: {
      entryId,
      ...analysis,
    },
  });
};
