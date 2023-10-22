import HistoryChart from "@/components/HistoryChart/component";
import { getAnalyses, getUser } from "@/lib/query.utils";
import { currentUser } from "@clerk/nextjs";

export default async function HistoryPage() {
  const currentUserInClerk = await currentUser();

  if (currentUserInClerk === null) {
    throw new Error("User not authed");
  }

  const user = await getUser(currentUserInClerk.id);

  if (user === null) {
    throw new Error("User not found");
  }

  const { average, analyses } = await getAnalyses(user.id);

  return (
    <div className="w-full h-full">
      <div className="">{`Avg. Sentiment: ${average}`}</div>
      <div className="w-full h-2/3">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
}
