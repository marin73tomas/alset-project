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

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleRegistration = (event) => {
    event.preventDefault();

    axios
      .post("/api/researchers/signup/", {
        name,
        email,
        password,
      })
      .then((resp) => {
        setSuccessModal(true);
        //setSuccessMsg(resp.data);
      })
      .catch((error) => {
        setErrorModal(true);
        console.log(error);
      });
  };
  if (redirect) return <Redirect to="/login"></Redirect>;
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
          An error has ocurred
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

      <MDBModal
        isOpen={successModal}
        toggle={() => {
          setSuccessModal(!successModal);
          setRedirect(true);
        }}
      >
        <MDBModalHeader>Your Account has been created</MDBModalHeader>
        <MDBModalBody>Please close this modal to continue to the login page...</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn
            color="secondary"
            onClick={() => {
              setSuccessModal(!successModal);
              setRedirect(true);
            }}
          >
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>

      <form
        style={{ maxWidth: "600px" }}
        className="mx-auto my-5"
        onSubmit={handleRegistration}
      >
        <p className="h5 text-center mb-4">Sign up</p>
        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
          Your name
        </label>
        <input
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          Your email
        </label>
        <input
          type="email"
          id="defaultFormRegisterEmailEx"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          Your password
        </label>
        <input
          type="password"
          id="defaultFormRegisterPasswordEx"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="text-center mt-4">
          <button className="btn btn-unique" type="submit">
            Register
          </button>
        </div>
      </form>
    </SectionContainer>
  );
};

export default Registration;
