import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import { Loader } from "lucide-react"; // Import the Loader icon

function Dashboard() {
  const { user, isLoaded } = useUser(); // Destructure user and isLoaded
  const [resumeList, setResumeList] = useState([]);
  const [isContentLoaded, setIsContentLoaded] = useState(false); // State to track if content is loaded

  useEffect(() => {
    const getResumeList = async () => {
      if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
        try {
          const resp = await GlobalApi.getUserResumes(user.primaryEmailAddress.emailAddress);
          setResumeList(resp.data.data);
        } catch (error) {
          console.error("Error fetching resumes:", error); // Enhanced logging
        } finally {
          setIsContentLoaded(true); // Set content loaded to true
        }
      }
    };

    getResumeList();
  }, [isLoaded, user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      {isContentLoaded ? ( // Render content only if it's fully loaded
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
          <Loader className="animate-spin w-8 h-8" /> {/* Spinner icon */}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
