"use client";

import { askQuestion } from "@/lib/api.utils";
import { useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);

          const answer = await askQuestion(value);

          setResponse(answer);
          setValue("");
          setLoading(false);
        }}
      >
        <input
          className="border border-black/20 px-4 py-2 text-large rounded-lg"
          disabled={loading}
          value={value}
          type="text"
          placeholder="Ask a question?"
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg ml-4 mb-4"
        >
          Ask
        </button>
      </form>
      {loading && <div>...loading</div>}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;
