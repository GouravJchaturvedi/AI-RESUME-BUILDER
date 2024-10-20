import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "../../../../service/AIModel";

const prompt =
  "Job Title : {jobTitle}, Based on job title give me 4-5 lines summary for the Resume. Give only on one para and that should have 4 or 5 lines";
function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summaryInput, setSummaryInput] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    summaryInput &&
      setResumeInfo({
        ...resumeInfo,
        summary: summaryInput,
      });
  }, [summaryInput]);

  const generateSummaryFromAI = async () => {
    setLoading(true)
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(result.response.text());
    setLoading(false)
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summary: summaryInput,
      },
    };
    GlobalApi.updateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast("Details Updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-black border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary Detail</h2>
        <p>Please provide a summary for your job title.</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              onClick={()=> generateSummaryFromAI()}
              variant="outline"
              type="button"
              className="border-gray-800  transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white flex gap-2"
            >
              <Brain className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>
          <Textarea
            required
            className="mt-4"
            onChange={(e) => setSummaryInput(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Summary;
