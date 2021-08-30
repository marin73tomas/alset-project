import React from "react";
import { MDBContainer, MDBRow } from "mdbreact";
//import "./style.css"; //Import here your file style
import ResearcherCard from "../components/ResearcherCard";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
const axios = require("axios");

const Researchers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const researchesList = data.map((e) => (
    <ResearcherCard {...e}></ResearcherCard>
  ));

  useEffect(() => {
    axios
      .get("/api/researchers/get/")
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
      <MDBRow className="w-100 h-100 my-5">
        {(loading && Spinner) ||
          (researchesList.length >= 1 && researchesList) || (
            <p style={{ fontSize: "28px" }}>No Researchers Found</p>
          )}
      </MDBRow>
    </MDBContainer>
  );
};

export default Researchers;
