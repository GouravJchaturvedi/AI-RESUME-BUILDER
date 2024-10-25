import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { TypographyH1 } from "./HeadingHero";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  GithubIcon,
  LaptopIcon,
  PenTool,
  PlayIcon,
} from "lucide-react";
import TypewriterText from "./TypeWriter";

function HomePage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  const handleOpenGitHub = () => {
    window.open(
      "https://github.com/GouravJchaturvedi/AI-RESUME-BUILDER",
      "_blank"
    );
  };

  return (
    <div>
      <div>
        <div className="flex justify-center mt-10 gap-1">
          <TypographyH1
            content={"ElevateCV"}
            color={"text-black"}
            size={"6xl"}
          />
          <PenTool />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-6 justify-center text-center sm:text-left">
          <div>
            <TypographyH1
              content={"Build Your Resume"}
              color={"text-black"}
              size={"4xl sm:text-5xl"} 
            />
          </div>
          <div>
            <TypographyH1
              content={"With AI"}
              color={"text-green-900"}
              size={"4xl sm:text-5xl"} 
            />
          </div>
        </div>

        <TypewriterText />
        <div className="flex justify-center mt-4 gap-3">
          <Button
            className="gap-2 hover:scale-105 transition-all hover:shadow-md"
            onClick={handleGetStarted}
          >
            Get Started <ArrowRight />
          </Button>
          {/* <Button
            className="gap-2 border border-gray-400 border-dotted hover:scale-105 transition-all hover:shadow-md"
            variant="outline"
          >
            <PlayIcon fill="#000000" /> Demo
          </Button> */}
          <Button
            variant="outline"
            className="border border-dotted border-gray-400 hover:scale-105 transition-all hover:shadow-md"
            onClick={handleOpenGitHub}
          >
            <GithubIcon /> Source Code
          </Button>
        </div>

        <div className="flex flex-col items-center mt-28">
          <TypographyH1
            content={"Features"}
            color={"text-black"}
            size={"4xl"}
            className="text-center mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
            <div className="p-8 bg-white rounded-lg shadow-lg hover:scale-105 transition-all hover:shadow-md">
              <LaptopIcon className="mb-4" />
              <TypographyH1
                content={"Easy to Use"}
                color={"text-black"}
                size={"xl"}
              />
              <p>
                Create professional resumes in minutes with our user-friendly
                interface.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-lg hover:scale-105 transition-all hover:shadow-md">
              <PlayIcon className="mb-4" />
              <TypographyH1
                content={"Interactive Preview"}
                color={"text-black"}
                size={"xl"}
              />
              <p>See real-time changes as you build your resume.</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-lg hover:scale-105 transition-all hover:shadow-md">
              <GithubIcon className="mb-4" />
              <TypographyH1
                content={"Open Source"}
                color={"text-black"}
                size={"xl"}
              />
              <p>
                Contribute and customize your experience with our open-source
                code.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-24">
          <TypographyH1
            content={"How It Works?"}
            color={"text-black"}
            size={"2xl"}
            className="text-center my-7"
          />
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full mb-20">
            <div className="flex-1 p-8 bg-white rounded-lg shadow-lg hover:scale-105 transition-all hover:shadow-md ">
              <TypographyH1
                content={"1. Start with a Template"}
                color={"text-black"}
                size={"xl"}
              />
              <p>Select a professional template to get started.</p>
            </div>
            <div className="flex-1 p-8 bg-white rounded-lg shadow-lg hover:scale-105 transition-all hover:shadow-md ">
              <TypographyH1
                content={"2. Customize Your Details"}
                color={"text-black"}
                size={"xl"}
              />
              <p>Fill in your information and adjust as needed.</p>
            </div>
            <div className="flex-1 p-8 bg-white rounded-lg shadow-lg hover:scale-105 transition-all hover:shadow-md ">
              <TypographyH1
                content={"3. Download Your Resume"}
                color={"text-black"}
                size={"xl"}
              />
              <p>Save your resume in multiple formats.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
