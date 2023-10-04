"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createNewEntry } from "@/lib/api.utils";

const NewEntryCard: React.FC = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const { data } = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
