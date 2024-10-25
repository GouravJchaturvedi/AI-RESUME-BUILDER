import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "../../../service/GlobalApi";
import { toast } from "sonner";

function ResumeCardItem({ resume, refreshData }) {
  const [openAlert, setOpenAlert] = useState(false);
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.deleteResumeById(resume.documentId).then(
      (resp) => {
        console.log(resp);
        toast.success("Resume Deleted");
        refreshData();
        setLoading(false);
        openAlert(false);
      },
      (error) => {
        setLoading(false);
        openAlert(false);
        toast.error("Delete Failed")
      }
    );
  };

  return (
    <div
      className="bg-black  rounded-lg hover:scale-105  transition-all hover:shadow-md mt-9 overflow-hidden"
      style={{ background: resume }}
    >
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="mt-1 bg-secondary flex justify-center items-center h-[280px] border border-dotted border-gray-400 rounded-lg ">
          <Notebook />
        </div>
      </Link>
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
              <DropdownMenuItem
                onClick={() =>
                  navigation("/dashboard/resume/" + resume.documentId + "/edit")
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigation("/my-resume/" + resume.documentId + "/view")
                }
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigation("/my-resume/" + resume.documentId + "/view")
                }
              >
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={openAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} disabled={loading}>
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export default ResumeCardItem;
