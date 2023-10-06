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

  const analysisData = [
    { name: "Summary", value: "" },
    { name: "Subject", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: false },
  ];

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-b border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
