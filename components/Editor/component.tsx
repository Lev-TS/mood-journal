"use client";

import React, { useState } from "react";
import { useAutosave } from "react-autosave";

import type { EditorProps } from "./types";
import { updateEntry } from "@/lib/api.utils";
import Spinner from "../Spinner/component";

const Editor: React.FC<EditorProps> = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry?.analysis);

  const analysisData = [
    { name: "Summary", value: analysis?.summary },
    { name: "Subject", value: analysis?.subject },
    { name: "Mood", value: analysis?.mood },
    { name: "Negative", value: String(analysis?.negative) },
  ];

  useAutosave({
    data: value,
    onSave: async (currentValue) => {
      if (value != entry.content) {
        setIsLoading(true);
        const { data } = await updateEntry(entry.id, currentValue);
        setAnalysis(data.analysis);
        setIsLoading(false);
      }
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-full grid grid-cols-3">
      <textarea
        className="w-full h-full p-8 text-xl outline-none col-span-2"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Write about your day here"
        disabled={isLoading}
      />

      <div className="border-l border-black/10">
        <div
          className="px-6 py-10"
          style={{ backgroundColor: analysis?.color }}
        >
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
};

export default Editor;
