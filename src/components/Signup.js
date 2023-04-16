import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Signup = (props) => {
  let history = useHistory();
  const host = "http://localhost:5000";
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const clickChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const btnSubmit = async (e) => {
    e.preventDefault();
    if (credential.password === credential.cpassword) {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          password: credential.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //redirect
        history.push("/");
        props.showAlert("Account created successfully", "success");
      } else {
        props.showAlert("Invalid Credentials Entries", "danger");
      }
    } else {
      props.showAlert("Password Mismatch Found", "danger");
    }
  };

  return (
    <div>
      <div className="container me-2">
        <div className={`container me-5 p-5 my-3 bg-${props.mode}`}>
          <form onSubmit={btnSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="name"
                className="form-control"
                id="name"
                name="name"
                value={credential.name}
                aria-describedby="emailHelp"
                onChange={clickChange}
                placeholder="Enter your name here"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credential.email}
                aria-describedby="emailHelp"
                onChange={clickChange}
              />
              <span className="form-text mx-2">
                Enter a valid email address
              </span>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Set Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credential.password}
                onChange={clickChange}
                minLength={8}
                required
              />
              <span className="form-text mx-2">
                Password must be atleast 8 charcters including numbers & special
                characters
              </span>
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Re-Enter Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                value={credential.cpassword}
                onChange={clickChange}
                minLength={8}
                required
              />
              <span className="form-text mx-2">
                To verify re-enter password
              </span>
            </div>
            <button
              type="submit"
              className={`btn btn-${
                props.mode === "light" ? "dark" : "light"
              } my-2`}
            >
              Sign - Up
            </button>
            <button
              type="reset"
              className={`btn btn-${
                props.mode === "light" ? "dark" : "light"
              } my-2 mx-3`}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
