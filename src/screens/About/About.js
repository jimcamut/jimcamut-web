import React, { useState } from "react";
import "./style.scss";

const About = () => {
  const foo = "bar";
  return (
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
      <h2>Coming soon!</h2>
      <p>This website is under construction</p>
    </div>
  );
};

export default About;
