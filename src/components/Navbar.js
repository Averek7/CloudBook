import React, { useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import NoteContext from "../context/NoteContext";

export default function Navbar(props) {
  const host = "http://localhost:5000";
  let location = useLocation();
  const history = useHistory();
  const context = useContext(NoteContext);
  const { deleteallnotes } = context;

  const btnLogout = () => {
    localStorage.clear();
    history.push("/signup");
    props.showAlert("Successfully Logged Out", "success");
  };

  const btnProfile = () => {};

  const btnDelete = async () => {
    if (window.confirm("Are you sure you want to delete")) {
      deleteallnotes();
      history.push("/signup");

      const response = await fetch(`${host}/api/auth/deleteuser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      console.log(await response.json());
      localStorage.clear();
      history.push("/signin");
      props.showAlert("Account Deleted !", "danger");
    } else {
      props.showAlert("Stay Tuned !", "primary");
    }
  };

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            CloudBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link
                  className="btn btn-secondary mx-1"
                  to="/signin"
                  role="button"
                >
                  Sign-In
                </Link>
                <Link
                  className="btn btn-secondary mx-1"
                  to="/signup"
                  role="button"
                >
                  Sign-Up
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <li className="nav-item dropdown" style={{ listStyle: "none" }}>
                  <Link
                    className={`nav-link dropdown-toggle text-${
                      props.mode === "light" ? "dark" : "light"
                    }`}
                    style={{ color: "white" }}
                    to="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-cog"></i>
                  </Link>
                  <ul
                    className={`dropdown-menu bg-${props.mode}`}
                    aria-labelledby="navbarDropdown"
                    style={{
                      padding: "0px",
                      margin: "0px",
                      borderRadius: "3px",
                    }}
                  >
                    <li>
                      <Link
                        className="btn btn-secondary d-block mx-auto"
                        style={{ border: "2px solid white" }}
                        to="/profile"
                        role="button"
                        onClick={btnProfile}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="btn btn-secondary d-block mx-auto"
                        style={{ border: "2px solid white" }}
                        to="/signup"
                        role="button"
                        onClick={btnDelete}
                      >
                        Delete Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="btn btn-secondary d-block mx-auto"
                        style={{ border: "2px solid white" }}
                        to="/signin"
                        role="button"
                        onClick={btnLogout}
                      >
                        Sign-Out
                      </Link>
                    </li>
                  </ul>
                </li>
              </div>
            )}
            <div className="form-check form-switch m-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onClick={props.toggleMode}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                {props.mode === "light" ? "light" : "dark"}
              </label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
