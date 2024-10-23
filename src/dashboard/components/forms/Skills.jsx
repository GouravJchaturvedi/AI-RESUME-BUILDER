import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  
  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const addNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const removeSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };

    GlobalApi.updateResumeDetail(resumeId, data)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        toast.success("Details updated successfully!");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        if (error.response) {
          toast.error(
            `Error: ${error.response.data.message || "Internal Server Error"}`
          );
        } else {
          toast.error("An error occurred. Please try again.");
        }
      });
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-black border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>List your Skills here.</p>

      <div>
        {skillsList.map((item, index) => (
          <div key={index} className="flex justify-between border p-3 my-5 rounded-lg">
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex gap-4">
          <Button
            onClick={addNewSkills}
            variant="outline"
            className="border-gray-400 transition ease-in-out duration-300 hover:bg-black hover:text-white"
          >
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            className="border-gray-400 transition ease-in-out duration-300 hover:bg-black hover:text-white"
            onClick={removeSkills}
          >
            - Remove
          </Button>
        </div>
        <div className="mt-3 flex justify-end">
          <Button 
            onClick={onSave} // Call onSave when the button is clicked
            disabled={loading}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
