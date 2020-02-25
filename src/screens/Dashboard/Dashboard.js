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
            Hi, I'm the webmaster about here. You can read more about me{" "}
            <Link to="about">here</Link>. Otherwise, click around and see what I
            did with the Strava, Instagram and Twitter APIs.
          </p>
          <footer>
            <p>Like my website? I've open sourced it.</p>
          </footer>
        </div>
      </div>
      <Loader />
    </div>
  );
};

export default Dashboard;
