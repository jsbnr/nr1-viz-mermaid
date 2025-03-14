import React from "react";
import { useProps } from "../context/VizPropsProvider";
import { useNerdGraphQuery } from "../hooks/useNerdGraphQuery";
import HydratedMermaid from "./HydratedMermaid"
import {Spinner} from "nr1"
// import MermaidComponent  from "./Mermaid";

const Viz = () => {
  const vizProps = useProps();
  const { accountId, query, definition, ignorePicker, fetchInterval, defaultSince } = vizProps;
  
  console.log(React.version)
  let data;
  if(query && query!="" && accountId && accountId!=""){ 
    ({ data } = useNerdGraphQuery(accountId, query, ignorePicker, fetchInterval, defaultSince));
    if(data.length > 0 ) {
      console.log("data",data)
    } 
  }

  return (
        <>
        {(data && data.length > 0) || query=="" ? <HydratedMermaid definition={definition} data={data} /> : <Spinner />}
        {/* <MermaidComponent theme="light" chart={`flowchart LR
    id
    `} /> */}
        </>
  );
};

export default Viz;