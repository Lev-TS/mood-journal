import { Analysis, JournalEntry } from "@prisma/client";

export interface EditorProps {
  entry: JournalEntry & { analysis: Analysis };
}
