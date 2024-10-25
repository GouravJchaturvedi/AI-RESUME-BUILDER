import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";
import { useUser } from "@clerk/clerk-react";

function ViewResume() {
  const { user, isLoaded } = useUser();
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        navigate("/");
      } else {
        getResumeInfo();
      }
    }
  }, [isLoaded, user, navigate]);

  const getResumeInfo = () => {
    GlobalApi.getResumeById(resumeId)
      .then((resp) => {
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching resume:", error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Your resume is ready! Download it now!
          </h2>
          <div className="flex justify-end gap-3 mt-6 my-6">
            <Button onClick={() => window.print()}>Download</Button>
            <RWebShare
              data={{
                text: "Hello! I'm excited to share my resume with you. Please open the URL to view it.",
                url: `${
                  import.meta.env.VITE_BASE_URL
                }/my-resume/${resumeId}/view`,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
