import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink,
  MDBTooltip,
  MDBIcon,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactComponent as Logo } from "./assets/logo.svg";
import Routes from "./Routes";
import Session from "react-session-api";

class App extends Component {
  state = {
    collapseID: "",
  };

  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));

  closeCollapse = (collID) => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: "" });
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;
    console.log("userEmail", Session.set("userEmail","testtommy"));
      console.log("userEmail", Session.get("userEmail"))
    return (
      <Router>
        <div className="flyout">
          <MDBNavbar color="indigo" dark expand="md" fixed="top" scrolling>
            <MDBNavbarBrand href="/" className="py-0 font-weight-bold">
              <Logo style={{ height: "2.5rem", width: "2.5rem" }} />
              <strong className="align-middle">MDB React</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
            <MDBCollapse id="mainNavbarCollapse" isOpen={collapseID} navbar>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink
                    exact
                    to="/"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    <strong>Home</strong>
                  </MDBNavLink>
                </MDBNavItem>
                {Session.get("userEmail") || (
                  <MDBNavItem>
                    <MDBNavLink
                      exact
                      to="/researches"
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                    >
                      <strong>Researchers</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                )}
                {Session.get("userEmail") || (
                  <MDBNavItem>
                    <MDBNavLink
                      exact
                      to="/register"
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                    >
                      <strong>Register</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                )}
                <MDBNavItem>
                  <MDBNavLink
                    exact
                    to="/login"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    <strong>Login</strong>
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: "4rem" }}>
            <Routes />
          </main>
          <MDBFooter color="indigo">
            <p className="footer-copyright mb-0 py-3 text-center">
              &copy; {new Date().getFullYear()} Copyright:
              <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
            </p>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;
