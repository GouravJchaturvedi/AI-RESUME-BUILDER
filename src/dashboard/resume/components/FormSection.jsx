import PersonalDetail from "@/dashboard/components/forms/PersonalDetail";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Summary from "@/dashboard/components/forms/Summary";
import Experience from "@/dashboard/components/forms/Experience";
import Education from "@/dashboard/components/forms/Education";
import Skills from "@/dashboard/components/forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="flex gap-2">
            {" "}
            <LayoutGrid /> Theme
          </Button>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              className="size-sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              {" "}
              <ArrowLeft />{" "}
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2 size-sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />{" "}
          </Button>
        </div>
      </div>

      {activeFormIndex === 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summary enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 4 ? (
        <Education enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 5 ? (
        <Skills enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 6 ? (
        <Navigate to={"/my-resume/" + resumeId + "/view"} />
      ) : null}

      {/* Experience */}

      {/* Education */}

      {/* Skills */}
    </div>
  );
}

export default FormSection;
