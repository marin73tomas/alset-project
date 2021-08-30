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

class App extends Component {
  state = {
    collapseID: "",
    isLoggedIn: localStorage.getItem("userEmail")
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

    //console.log ('user email:', this.state.isLoggedIn );

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
                {!this.state.isLoggedIn ? (
                  ""
                ) : (
                  <MDBNavItem>
                    <MDBNavLink
                      exact
                      to="/researchers"
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                    >
                      <strong>Researchers</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                )}
                {this.state.isLoggedIn ? (
                  ""
                ) : (
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
                {this.state.isLoggedIn ? (
                  ""
                ) : (
                  <MDBNavItem>
                    <MDBNavLink
                      exact
                      to="/login"
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                    >
                      <strong>Login</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                )}
                {!this.state.isLoggedIn ? (
                  ""
                ) : (
                  <MDBNavItem>
                    <MDBNavLink
                      exact
                      to="/my-subscriptions"
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                    >
                      <strong>My Subscriptions</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                )}
                {!this.state.isLoggedIn ? (
                  ""
                ) : (
                  <MDBNavItem>
                    <MDBNavLink
                      exact
                      to="/upload-journals"
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                    >
                      <strong>Upload Journals</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                )}
                {!this.state.isLoggedIn ? (
                  ""
                ) : (
                  <MDBNavItem>
                    <MDBNavLink
                      exact
                      to="/logout"
                      onClick={() => {
                        // remove all
                        localStorage.clear();
                        window.location.reload()
                        this.closeCollapse("mainNavbarCollapse");
                      }}
                    >
                      <strong>Logout</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                )}
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
