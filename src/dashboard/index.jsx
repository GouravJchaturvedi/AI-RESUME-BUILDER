import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import { Loader } from "lucide-react";

function Dashboard() {
  const { user, isLoaded } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/auth/sign-in");
      return;
    }

    const getResumeList = async () => {
      if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
        try {
          const resp = await GlobalApi.getUserResumes(
            user.primaryEmailAddress.emailAddress
          );
          setResumeList(resp.data.data);
        } catch (error) {
          console.error("Error fetching resumes:", error);
        } finally {
          setIsContentLoaded(true);
        }
      }
    };

    getResumeList();
  }, [isLoaded, user, navigate]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      {isContentLoaded ? (
        <>
          <h2 className="font-bold text-3xl">My Resume</h2>
          <p className="uppercase">
            Begin crafting your AI resume for your next job opportunity.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            <AddResume />
            {resumeList.map((resume, index) => (
              <ResumeCardItem resume={resume} key={index} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <Loader className="animate-spin w-8 h-8" />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
