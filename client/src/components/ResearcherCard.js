import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";
const axios = require("axios");
import { useState, useCallback } from "react";
import Session from "react-session-api";

const ResearcherCard = ({ _id, name, isSubscribed }) => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(isSubscribed);

  const onSubscribe = useCallback(async () => {
    // don't send again while we are Subscribing
    if (isSubscribing) return;
    // update state
    setIsSubscribing(true);
    // send the actual request
    const config = {
      method: "post",
      url: "/api/researchers/subscribe/",
      data: {
        userId: Session.get("currentUserId"),
        userSubscribesTo: _id,
      },
    };
    try {
      const res = await axios.post(config);
      // once the request is sent, update state again
      if (res.data) setSubscribed(true);
    } catch (error) {
      console.log(error);
    }
    setIsSubscribing(false);
  }, [isSubscribing]); // update the callback if the state changes

  return (
    <MDBCol className="my-4" sm="6" md="4">
      <MDBCard className="mx-auto" >
        <MDBCardImage className="img-fluid m-auto" src="/profile.png" waves />
        <MDBCardBody>
          <MDBCardTitle className="text-center">{name}</MDBCardTitle>

          <MDBBtn
            className="d-block m-auto"
            {...(subscribed && { disabled: true })}
            onClick={onSubscribe}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};
export default ResearcherCard;
