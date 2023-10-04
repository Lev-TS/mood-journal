import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getUser } from "@/lib/query.utils";
import { createUser } from "@/lib/mutation.utils";

const createNewUser = async () => {
  const currentUserInClerk = await currentUser();

  if (!currentUserInClerk) {
    throw new Error("User is missing");
  }

  const user = await getUser(currentUserInClerk.id);

  if (user === null) {
    await createUser({
      clerkId: currentUserInClerk.id,
      email: currentUserInClerk.emailAddresses[0].emailAddress,
    });
  }

  redirect("/journal");
};

export default async function NewUserPage() {
  await createNewUser();

  return <div>...loading</div>;
}
