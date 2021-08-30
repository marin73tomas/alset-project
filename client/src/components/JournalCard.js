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
import Redirect from "react-router-dom";

const ResearcherCard = ({ name, path }) => {
  return (
    <MDBCol className="my-4" sm="6" md="4">
      <MDBCard className="mx-auto">
        <MDBCardImage className="img-fluid m-auto" src="/pdfthumb.png" waves />
        <MDBCardBody>
          <MDBCardTitle className="text-center">{name}</MDBCardTitle>

          <MDBBtn
            onClick={() => {
              <Redirect to={path} />;
            }}
          >
            View
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};
export default ResearcherCard;
