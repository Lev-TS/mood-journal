import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

import { getUser } from "@/lib/query.utils";
import { createJournalEntry } from "@/lib/mutation.utils";

export const POST = async () => {
  const currentUserInClerk = await currentUser();

  if (currentUserInClerk === null) {
    console.log("Not authed");
    return null;
  }

  const user = await getUser(currentUserInClerk.id);

  if (user === null) {
    console.log("user not found");
    return null;
  }

  const entry = await createJournalEntry({
    userId: user.id,
    content: "Write about your day",
  });

  return NextResponse.json({ data: entry });
};
