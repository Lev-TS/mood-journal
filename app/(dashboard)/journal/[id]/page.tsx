import { currentUser } from "@clerk/nextjs";

import Editor from "@/components/Editor/component";
import type { EntryPageProps } from "./types";
import { getEntry, getUser } from "@/lib/query.utils";

export default async function EntryPage({ params }: EntryPageProps) {
  const currentUserInClerk = await currentUser();

  if (currentUserInClerk === null) {
    throw new Error("User not authed");
  }

  const user = await getUser(currentUserInClerk.id);

  if (user === null) {
    throw new Error("User not found");
  }

  const entry = await getEntry(params.id, user.id);

  if (entry === null) {
    throw new Error("Entry not found");
  }

  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
}
