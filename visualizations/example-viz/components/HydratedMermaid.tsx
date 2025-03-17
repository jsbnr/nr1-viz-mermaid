import React, { useRef, useEffect, useState } from "react";
import mermaid from "mermaid";
const HydratedMermaid = ({
  definition,
  data,
}: {
  definition: string;
  data: Array<{ [key: string]: any }>;
}) => {
  const [updatedDefinition, setUpdatedDefinition] = useState(definition);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Find tokens and replace placeholders
    const rawTokens = definition.match(/(\[\[\[.*?\]\]\])/g) || [];
    let updatedDef = definition.replaceAll("\\n", "\n");
    rawTokens.forEach((token) => {
      const match = token.match(/\[\[\[(.*?)(?:\|(.*?))?\]\]\]/);
      if (match) {
        const tokenValue = match[1];
        const defaultValue = match[2] || "";
        const replacementValue =
          data.find((d) => d[tokenValue])?.[tokenValue] || defaultValue;
        updatedDef = updatedDef.replace(token, replacementValue);
      }
    });
    setUpdatedDefinition(updatedDef);
  }, [definition, data]);
  useEffect(() => {
    if (!containerRef.current) return;
    // Initialize Mermaid
    mermaid.initialize({ startOnLoad: false,theme: 'neutral'});
    // Generate a unique ID for Mermaid rendering
    // substr is crucial here to render mermaid diagrem properly
    const mermaidId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
    // Create a new div inside the container
    containerRef.current.innerHTML = `<div class="mermaid" id="${mermaidId}">${updatedDefinition}</div>`;
    // Render the diagram
    mermaid.init(undefined, `#${mermaidId}`);
  }, [updatedDefinition]);
  return <div ref={containerRef} />;
};
export default HydratedMermaid;