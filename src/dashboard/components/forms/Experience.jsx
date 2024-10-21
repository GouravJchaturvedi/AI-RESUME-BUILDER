import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience() {
  const [experienceList, setExperienceList] = useState([formField]);

  const {resumeInfo , setResumeInfo} = useContext(ResumeInfoContext)

  const handleChange = (index, e) => {
    // const updatedList = [...experienceList];
    // updatedList[index][e.target.name] = e.target.value;
    // setExperienceList(updatedList);
    const newEntries = experienceList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };

  const handleSave = () => {};

  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
        ...resumeInfo,
        experience:experienceList
    })
  }, [experienceList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-black border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>List your previous job experiences here.</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <Input name="title" onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input name="city" onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input name="state" onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  name="startDate"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  name="endDate"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "workSummary", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex gap-4">
          <Button
            onClick={addNewExperience}
            variant="outline"
            className="border-gray-400 transition ease-in-out duration-300 hover:bg-black hover:text-white"
          >
            + Add More Experience
          </Button>
          <Button
            variant="outline"
            className="border-gray-400 transition ease-in-out duration-300 hover:bg-black hover:text-white"
            onClick={removeExperience}
          >
            - Remove
          </Button>
        </div>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}

export default Experience;
