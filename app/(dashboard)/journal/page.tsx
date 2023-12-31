import { auth } from "@clerk/nextjs";
import Link from "next/link";

import { getEntries, getUser } from "@/lib/query.utils";
import NewEntryCard from "@/components/NewEntryCard/component";
import EntryCard from "@/components/EntryCard/component";
import Question from "@/components/Question/component";

export default async function JournalPage() {
  const clerk = await auth();

  if (clerk.userId === null) {
    throw new Error("Not authenticated");
  }

  const user = await getUser(clerk.userId);

  if (user === null) {
    throw new Error("Not found");
  }

  const entries = await getEntries(user.id);

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="my-4">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}
