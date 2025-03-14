import React from "react";
import { AutoSizer } from "nr1";

import EmptyState from "./components/EmptyState";
import MermaidViz from "./components/Viz";

const Viz = ({ definition }) => {
  // return empty state if no config  
  if (!definition) {
    return <EmptyState />;
  }

  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <MermaidViz />
        );
      }}
    </AutoSizer>
  );
};

export default Viz;