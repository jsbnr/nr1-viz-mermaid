import React, {useRef,useEffect, useState} from "react";
import Mermaid from "react-mermaid2"

const HydratedMermaid = ({ definition, data }: { definition: string; data: Array<{ [key: string]: any }> }) => {
    const [renderKey, setRenderkey] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    //Find tokens
    const rawTokens = definition.match(/(\[\[\[.*?\]\]\])/g) || [];
    let updatedDefinition = definition.replaceAll('\\n','\n'); //convert line breaks

    rawTokens.forEach(token => {
        const match = token.match(/\[\[\[(.*?)(?:\|(.*?))?\]\]\]/);
        if (match) {
            const tokenValue = match[1];
            const defaultValue = match[2] || '';
            const replacementValue = data && data.find(d => d[tokenValue])?.[tokenValue] || defaultValue;
            updatedDefinition = updatedDefinition.replace(token, replacementValue);
        }
    });

    useEffect(() => {

        //this doesnt seem to work or do anything useful :/
        // if (ref.current) {
        //     const mermaidElement = ref.current.querySelector('.mermaid');
        //     if (mermaidElement) {
        //         mermaidElement.removeAttribute('data-processed');
        //     }
        // }
    
       setRenderkey(!renderKey); //needed to force re-render of chart
    }, [updatedDefinition, JSON.stringify(data)]);


    return <div ref={ref} ><Mermaid key={renderKey}  chart={updatedDefinition}/></div>
}


export default HydratedMermaid;