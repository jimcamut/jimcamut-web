import React from "react";

const dayMap = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const Graph = ({ weekSet, title, desc, max }) => (
  <svg
    className="chart"
    aria-labelledby="title desc"
    role="img"
    viewBox={`0 0 200 150`}
    preserveAspectRatio="xMidYMid meet"
    style={{ width: "100%" }}
  >
    {title && <title className="title">{title}</title>}
    {desc && <desc className="desc">{desc}</desc>}
    {weekSet.map((day, idx) => (
      <g className="bar" key={idx}>
        <rect
          className="distance"
          width={0}
          height="19"
          y={idx * 20}
          fill={day ? "rgba(0, 195, 255, 0.9)" : "rgba(255,255,255,0.05)"}
          style={{
            transition: "0.4s ease",
            width: day ? (day[1] / max) * 100 * 0.75 + "%" : "11%"
          }}
        ></rect>
        <text x={5} y={idx * 20 + 8} dy=".35em" fill="white" fontSize={10}>
          {dayMap[idx]}
        </text>
        {day && day[1] && (
          <text
            x={(day[1] / max) * 200 * 0.75 + 5}
            y={idx * 20 + 8}
            dy=".35em"
            fill="white"
            fontSize={10}
          >
            {day[1].toFixed(2)} mi
          </text>
        )}
      </g>
    ))}
  </svg>
);
export default Graph;
