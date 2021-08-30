import React from "react";
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
//import "./style.css"; //Import here your file style

import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Redirect } from "react-router-dom";

const axios = require("axios");

const UserSubscriptions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState("");

  const subscriptionsList = data.map((e) => (
    <MDBListGroupItem
      hover
      onClick={() => {
        setRedirect(`/researcher/${e._id}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <h2>{e.name}</h2>
      <p>Number of journals: {e.journalsURL.length}</p>
    </MDBListGroupItem>
  ));

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`/api/researchers/get/${userId}`)
      .then((resp) => {
        axios
          .post(`/api/researchers/list`, {
            ids: resp.data[0].subscriptions,
          })
          .then((respList) => {
            console.log(respList.data);
            if (respList.data) setData(respList.data);
            setLoading(false);
          })
          .catch((respList) => {
            console.log(respList);
            setLoading(false);
          });
        //setData(resp.data);
        setLoading(false);
      })
      .catch((resp) => {
        console.log(resp);
        setLoading(false);
      });
  }, []);
  if (redirect)
    return (
      <Redirect
        to={{
          pathname: redirect,
          state: { id: redirect.split("/researcher/")[1] },
        }}
      />
    );
  return (
    <MDBContainer>
      <MDBListGroup className="w-100 mx-auto my-5">
        {(loading && <Spinner />) ||
          (subscriptionsList.length >= 1 && subscriptionsList) || (
            <p style={{ fontSize: "28px" }}>No Subscriptions Found</p>
          )}
      </MDBListGroup>
    </MDBContainer>
  );
};

export default UserSubscriptions;
