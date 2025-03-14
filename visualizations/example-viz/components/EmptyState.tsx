import React from "react";
import {
  Card,
  CardBody,
  HeadingText
} from "nr1";

const EmptyState: React.FC = () => (
  
  <Card className="EmptyState">
    <CardBody className="EmptyState-cardBody">
      <HeadingText
        spacingType={[HeadingText.SPACING_TYPE.LARGE]}
        type={HeadingText.TYPE.HEADING_3}
      >
        Please provide a valid mermaid definition.
       
      </HeadingText>
    </CardBody>
  </Card>
);

export default EmptyState;