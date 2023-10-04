import { prisma } from "./db.utils";

export const getUser = async (clerkId: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      clerkId,
    },
  });
};

export const getEntries = async (
  userId: string,
  order: "desc" | "asc" = "desc"
) => {
  return await prisma.journalEntry.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: order,
    },
  });
};
