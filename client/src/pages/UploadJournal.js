import axios from "axios";

import React, { Component } from "react";

const UploadJournal = () => {
  const uploadFile = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    axios.post("api/researchers/addjournal", data).then((res) => {
      console.log(res.status, res.statusText, res);
      axios
        .post("api/researchers/addjournalUser", {
          userId: localStorage.getItem("userId"),
          path: res.data.path,
        })
        .then((res) => {
          alert("PDF has been succesfully uploaded!");
          event.target.value = ""
        });
    });
  };
  return (
    <div className="d-flex mx-auto justify-content-center align-items-center flex-column">
      <input accept="application/pdf" onChange={uploadFile} type="file" />
    </div>
  );
};

export default UploadJournal;
