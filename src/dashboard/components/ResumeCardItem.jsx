import { MoreVertical, Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ResumeCardItem({ resume }) {
  return (
    <div
      className="bg-black  rounded-lg hover:scale-105  transition-all hover:shadow-md mt-9 overflow-hidden"
      style={{ background: resume }}
    >
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="mt-1 bg-secondary flex justify-center items-center h-[280px] border border-dotted border-gray-400 rounded-lg ">
          <Notebook />
        </div>
        <div className="flex justify-between mx-2">
          <h2 className="text-center my-2 flex mx-2 text-white font-semibold">
            {resume.title}
          </h2>
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="h-4 w-4 cursor-pointer text-white font-bold" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Download</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ResumeCardItem;
