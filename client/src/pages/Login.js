import React from "react";
import { useState } from "react";
import SectionContainer from "../components/sectionContainer";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import { Redirect } from "react-router-dom";


const axios = require("axios");

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("/api/researchers/login", {
        name,
        email,
        password,
      })
      .then((resp) => {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", resp.data._id);
        //console.log("set email:", localStorage.getItem("userEmail"));
        setRedirect(true);
      })
      .catch((error) => {

        setErrorMsg(error.response.data.error)
        setErrorModal(true);
        console.log(error);
      });
  };
  if (redirect) return <Redirect to="/my-subscriptions"></Redirect>;
  return (
    <SectionContainer>
      <MDBModal
        isOpen={errorModal}
        toggle={() => {
          setErrorModal(!errorModal);
        }}
      >
        <MDBModalHeader
          toggle={() => {
            setErrorModal(!errorModal);
          }}
        >
          An error has ocurred: {errorMsg}
        </MDBModalHeader>
        <MDBModalBody>Please close this modal to continue...</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn
            color="secondary"
            onClick={() => {
              setErrorModal(!errorModal);
            }}
          >
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
      <form
        className="mx-auto my-5"
        style={{ maxWidth: "600px" }}
        onSubmit={handleLogin}
      >
        <p className="h5 text-center mb-4">Sign in</p>
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          Your email
        </label>
        <input
          type="email"
          id="defaultFormLoginEmailEx"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
          Your password
        </label>
        <input
          type="password"
          id="defaultFormLoginPasswordEx"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center mt-4">
          <button className="btn btn-indigo" type="submit">
            Login
          </button>
        </div>
      </form>
    </SectionContainer>
  );
};

export default Login;
