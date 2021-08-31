import React from "react";
import { MDBContainer, MDBRow } from "mdbreact";
//import "./style.css"; //Import here your file style
import ResearcherCard from "../components/ResearcherCard";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
const axios = require("axios");

const Researchers = () => {
  const [data, setData] = useState([]);
  const [individualData, setIndividualData] = useState([]);
  const [loading, setLoading] = useState(true);

  const isSubscribed = (id) => {

    if (individualData && individualData.length >= 1 ) {
    
    for (let sub of individualData[0].subscriptions) {
      if (sub == id) return true;
    }
  }
  };

  const researchersList = data.map((e) => (
    <ResearcherCard
      key={e._id}
      isSubscribed={isSubscribed(e._id)}
      {...e}
    ></ResearcherCard>
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

    axios
      .get(`/api/researchers/get/${localStorage.getItem("userId")}`)
      .then((resp) => {
        setIndividualData(resp.data);
        setLoading(false);
      })
      .catch((resp) => {
        console.log(resp);
      });
  }, []);
  return (
    <MDBContainer>
      <MDBRow className="w-100 h-100 my-5">
        {(loading && <Spinner />) ||
          (researchersList.length >= 1 && researchersList) || (
            <p style={{ fontSize: "28px" }}>No Researchers Found</p>
          )}
      </MDBRow>
    </MDBContainer>
  );
};

export default Researchers;
