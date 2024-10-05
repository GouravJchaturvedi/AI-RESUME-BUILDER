import React from "react";

function SummaryPreview({ resumeInfo }) {
  return <p className="text-xs">{resumeInfo?.summary}</p>;
}

export default SummaryPreview;
