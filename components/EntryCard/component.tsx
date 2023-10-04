import React from "react";

import { type EntryCardProps } from "./types";

const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  return <div>{entry.id}</div>;
};

export default EntryCard;
