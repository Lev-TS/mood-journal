import { Analysis, type JournalEntry } from "@prisma/client";

export interface EntryCardProps {
  entry: JournalEntry & { analysis: Analysis };
}
