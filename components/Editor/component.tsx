"use client";

import React, { useState } from "react";
import { useAutosave } from "react-autosave";

import type { EditorProps } from "./types";
import { updateEntry } from "@/lib/api.utils";

const Editor: React.FC<EditorProps> = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  useAutosave({
    data: value,
    onSave: async (currentValue) => {
      setIsLoading(true);
      await updateEntry(entry.id, currentValue);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full">
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Write about your day here"
        disabled={isLoading}
      />
    </div>
  );
};

export default Editor;
