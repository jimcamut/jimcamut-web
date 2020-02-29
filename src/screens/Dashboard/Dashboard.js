import React, { useState } from "react";
import "./style.scss";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const foo = "bar";
  return (
    <div className="dashboard">
      <div className="about-column">
        <div className="container content">
          <div className="circle">
            <img src="http://static.jimcamut.com/img/jimcamut.jpg" />
          </div>
          <h1>Jim Camut</h1>
          <p>
            Hi, I'm the webmaster around here. You can read more about me{" "}
            <Link to="about">here</Link>. Otherwise, click around and see what I
            did with the <Link to="strava">Strava</Link>,{" "}
            <Link to="grams">Instagram</Link> and{" "}
            <Link to="tweets">Twitter</Link> APIs.
          </p>
          {/* <footer>
            <p>Like my website? I've open sourced it.</p>
          </footer> */}
        </div>
      </div>
      {/* <Loader /> */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff"
        }}
      >
        <h2>More coming soon!</h2>
        <p>This website is under construction</p>
      </div>
    </div>
  );
};

export default Dashboard;
