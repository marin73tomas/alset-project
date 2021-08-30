import React from "react";
import { MDBContainer, MDBRow } from "mdbreact";
//import "./style.css"; //Import here your file style
import SubscriptionRow from "../components/SubscriptionRow";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const axios = require("axios");

const UserSubscriptions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubscription = (id) => {
     
  }
  const subscriptionsList = data.map((e) => (
    <div onClick={handleSubscription.bind(e._id)}>
      <h2>{e.name}</h2>
      <p>Number of journals: {e.journalsURL.length}</p>
    </div>
  ));

  const userId = Session.get("userId");

  useEffect(() => {
    axios
      .get(`/api/researchers/subscriptions/${userId}`)
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
          (subscriptionsList.length >= 1 && subscriptionsList) || (
            <p style={{ fontSize: "28px" }}>No Subscriptions Found</p>
          )}
      </MDBRow>
    </MDBContainer>
  );
};

export default UserSubscriptions;
