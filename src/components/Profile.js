import React from "react";

const Profile = (props) => {
  return (
    <div>
      <div
        className={`card bg-${props.mode === "light" ? "light" : "dark"} text-${
          props.mode === "light" ? "black" : "light"
        } d-block m-auto text-center`}
        style={{ margin: "20px 0px", width: "30rem" }}
      >
        <img src="..." className="card-img-top m-3" alt="..." />
        <div className="card-body">
          <h5 className="card-title">User Profile</h5>
          <p className="card-text">Name</p>
          <p className="card-text">Tags</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
