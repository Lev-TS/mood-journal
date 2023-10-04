import { prisma } from "./db.utils";

export const getUser = async (clerkId: string) => {
  return await prisma.user.findUnique({
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
      userId,
    },
    orderBy: {
      createdAt: order,
    },
  });
};
