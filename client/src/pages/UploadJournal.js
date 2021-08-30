import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDropzone } from "react-dropzone";
const axios = require("axios");

function UploadJournals() {
  const onDrop = useCallback((acceptedFiles) => {
       
    axios
      .post("/api/researchers/addjournals", {
        files: acceptedFiles,
      })
      .then((resp) => {
        Session.set("userEmail", email);
        setRedirect(true);
      })
      .catch((error) => {
        setErrorModal(true);
        console.log(error);
      });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop, accept: "application/pdf" });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
export default UploadJournals;
