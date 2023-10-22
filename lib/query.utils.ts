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
    include: {
      analysis: true,
    },
    orderBy: {
      createdAt: order,
    },
  });
};

export const getEntry = async (entryId: string, userId: string) => {
  return await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        id: entryId,
        userId,
      },
    },
    include: {
      analysis: true,
    },
  });
};

export const getAnalyses = async (userId: string) => {
  const analyses = await prisma.analysis.findMany({
    where: { userId },
    orderBy: {
      createdAt: "asc",
    },
  });

  const sum = analyses.reduce(
    (total, current) => total + current.sentimentScore,
    0
  );
  const average = Math.round(sum / analyses.length);

  return { analyses, average };
};
