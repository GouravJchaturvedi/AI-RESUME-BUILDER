import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ResumeCardItem({ resume }) {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div className="p-14 bg-secondary flex justify-center items-center h-[280px] hover:scale-105 transition-all hover:shadow-md border border-dotted border-gray-400 mt-10 rounded-lg">
        <Notebook />
      </div>
      <h2 className="text-center my-1">{resume.title}</h2>
    </Link>
  );
}

export default ResumeCardItem;
