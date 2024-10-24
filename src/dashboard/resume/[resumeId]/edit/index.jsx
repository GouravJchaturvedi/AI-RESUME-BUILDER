import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

function EditResume() {
  const { isSignedIn } = useUser(); 
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/"); 
    } else {
      getResumeInfo(); 
    }
  }, [isSignedIn, navigate]); 

  const getResumeInfo = () => {
    GlobalApi.getResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
