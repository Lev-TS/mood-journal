import { JournalEntry } from "@prisma/client";

const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const createNewEntry = async (): Promise<{ data: JournalEntry }> => {
  const res = await fetch(
    new Request(createUrl("/api/journal"), {
      method: "POST",
      body: JSON.stringify({ content: "new entry" }),
    })
  );

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};
