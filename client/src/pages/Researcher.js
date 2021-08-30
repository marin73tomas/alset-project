import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useState, useEffect } from "react";
import JournalCard from "../components/JournalCard";

const axios = require("axios");

const Researcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = window.location.pathname.split("researcher/")[1];
  const userInfo = data.map((e) => (
    <>
      <h2 style={{ fontWeight: "bold", fontSize: "25px" }} className="my-3">
        Researcher Information:
      </h2>
      <h3 className="my-3">Name: {e.name}</h3>
      <h3 className="my-3">Email {e.email}</h3>
      <hr />
      <h2 style={{ fontWeight: "bold", fontSize: "25px" }} className="my-3">
        Journals:
      </h2>

      {(e.journalsURL.length >= 1 && (
        <MDBRow className="w-100 h-100 my-5">
          {e.journalsURL.map((j) => (
            <JournalCard key={j} path={j} />
          ))}
        </MDBRow>
      )) || <h3>This researcher has no journals.</h3>}
    </>
  ));
  useEffect(() => {
    axios
      .get(`/api/researchers/get/${id}`)
      .then((resp) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch((resp) => {
        console.log(resp);
      });
  }, []);
  return (
    <MDBContainer>
      <MDBRow className="w-100 h-100 ">
        <MDBCol className=" mx-auto" md="6">
          {userInfo}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Researcher;
