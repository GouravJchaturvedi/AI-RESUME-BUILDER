import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function EditResume() {
  const params = useParams();

  useEffect(() => {
    console.log(params.resumeId);
  } , [])
  return <div>Edit Resume</div>;
}

export default EditResume;
