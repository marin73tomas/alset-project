import React from "react";
import { MDBContainer, MDBRow } from "mdbreact";
//import "./style.css"; //Import here your file style
import SubscriptionRow from "../components/SubscriptionRow";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const axios = require("axios");

const JournalsPreview = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const journalsList = data.map((e) => (
    <div onClick={handleSubscription.bind(e.)}>
      <h2>{e.name}</h2>
    </div>
  ));

  const userId = Session.get("userId");

  useEffect(() => {
    axios
      .get(`/api/researchers/${id}`)
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
          (journalsList.length >= 1 && journalsList) || (
            <p style={{ fontSize: "28px" }}>No Subscriptions Found</p>
          )}
      </MDBRow>
    </MDBContainer>
  );
};

export default JournalsPreview;
