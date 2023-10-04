import { auth } from "@clerk/nextjs";

import { getEntries, getUser } from "@/lib/query.utils";
import NewEntryCard from "@/components/NewEntryCard/component";
import EntryCard from "@/components/EntryCard/component";

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
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
