import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

function Education() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const handleChange = (event, index) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  const addNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    setEducationList((educationList) => educationList.slice(0, -1));
  };

  const handleSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList,
      },
    };

    GlobalApi.updateResumeDetail(params.resumeId, data)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        toast.success("Details updated!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Server Error, Please try again");
      });
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList,
    });
  }, [educationList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-black border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>List your Education Details here.</p>
      <div>
        {educationList.map((item, index) => (
          <div key={index}>
            {" "}
            {/* Add key prop here */}
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="grid col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input name="degree" onChange={(e) => handleChange(e, index)} />
              </div>
              <div>
                <label>Major</label>
                <Input name="major" onChange={(e) => handleChange(e, index)} />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex gap-4">
          <Button
            onClick={addNewEducation}
            variant="outline"
            className="border-gray-400 transition ease-in-out duration-300 hover:bg-black hover:text-white"
          >
            + Add More Experience
          </Button>
          <Button
            variant="outline"
            className="border-gray-400 transition ease-in-out duration-300 hover:bg-black hover:text-white"
            onClick={removeEducation}
          >
            - Remove
          </Button>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
