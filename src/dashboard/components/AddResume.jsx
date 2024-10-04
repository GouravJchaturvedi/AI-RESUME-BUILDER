import { PlusSquare } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { v4 as uuid } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function AddResume() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [resumeTitle, setResumeTitle] = React.useState("");

  const onCreate = () => {
    const uid = uuid();
    console.log(resumeTitle, uid);
  };
  return (
    <div>
      <div
        className="px-14 py-24 border items-center flex justify-center bg-secondary rounded-lg mt-10 h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dotted border-gray-400"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Resume</DialogTitle>
            <DialogDescription>
              <p>Add a Title for your new Resume</p>
              <Input
                className="mt-2"
                placeholder="Ex.Full Stack Developer"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end pt-3 gap-2 max-sm:justify-center">
              <Button
                variant="outline"
                className="border-gray-600"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button disabled={!resumeTitle} onClick={onCreate()}>
                Create
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
