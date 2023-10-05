import { prisma } from "./db.utils";
import type { CreateUserArgs, CreateJournalEntryArgs } from "./mutation.types";

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
