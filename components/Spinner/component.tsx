import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-foreground" />
    </div>
  );
};

export default Spinner;
