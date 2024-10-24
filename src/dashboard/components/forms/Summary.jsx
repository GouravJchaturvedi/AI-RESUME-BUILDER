import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "../../../../service/AIModel";
import { toast } from "sonner";

const prompt =
  "Job Title : {jobTitle}, Based on job title give me 4-5 lines summary for the Resume. Give only on one para and that should have 4 or 5 lines";

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summaryInput, setSummaryInput] = useState(resumeInfo?.summary || "");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      summary: summaryInput,
    }));
  }, [summaryInput]);

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const summary = result.response.text();
      setSummaryInput(summary);
      setResumeInfo((prev) => ({
        ...prev,
        summary,
      }));
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summary: summaryInput,
      },
    };
    try {
      const resp = await GlobalApi.updateResumeDetail(params?.resumeId, data);
      console.log(resp);
      enabledNext(true);
      toast("Details Updated");
    } catch (error) {
      console.error("Error updating resume details:", error);
    } finally {
      setLoading(false);
    }
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
              onClick={generateSummaryFromAI}
              variant="outline"
              type="button"
              className="border-gray-800 transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white flex gap-2"
            >
              <Brain className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>
          <Textarea
            required
            className="mt-4"
            value={summaryInput}
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
