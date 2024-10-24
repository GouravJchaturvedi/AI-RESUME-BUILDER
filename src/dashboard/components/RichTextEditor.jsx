import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../service/AIModel";
import { toast } from "sonner";

const PROMPT =
  "position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const generateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience || !resumeInfo.experience[index]) {
      toast("Experience data is not available");
      return;
    }

    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = result.response.text();

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = responseText;

      const bulletPoints = Array.from(tempDiv.querySelectorAll("li")).map(
        (li) => li.innerText
      );

      if (bulletPoints.length > 0) {
        setValue(bulletPoints[0]);
      } else {
        setValue("");
      }

      console.log("First bullet point:", bulletPoints[0]);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast("Error generating summary. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-800  transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white flex gap-2"
          onClick={generateSummaryFromAI}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
          Generate from AI
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <Separator />
            <BtnStrikeThrough />
            <Separator />
            <BtnUndo />
            <Separator />
            <BtnRedo />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
