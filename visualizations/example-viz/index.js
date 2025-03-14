import React, { useState } from "react";
import { PlatformStateContext, NerdletStateContext } from "nr1";
import { VizPropsProvider } from "./context/VizPropsProvider";
import Viz from "./Viz";

const ExampleViz = (props) => {
  return (
    <div style={{ height: "100%" }}>
      <PlatformStateContext.Consumer>
        {(platformContextState) => (
          <NerdletStateContext.Consumer>
            {(nerdletContextState) => (
              <VizPropsProvider {...props}>
                <Viz
                  platformState={platformContextState}
                  // platformState 
                  nerdletState={nerdletContextState}
                  // props from config
                  {...props}
                />
            </VizPropsProvider>
            )}
          </NerdletStateContext.Consumer>
        )}
      </PlatformStateContext.Consumer>
    </div>
  );
};

export default ExampleViz;