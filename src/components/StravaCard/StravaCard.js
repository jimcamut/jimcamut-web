import React, { memo } from "react";
import "./style.scss";
import moment from "moment-timezone";
import CacheImage from "../CacheImage/CacheImage";
import { MdDirectionsBike, MdDirectionsRun } from "react-icons/md";
/**
 * TODOs:
 * 1) Generate image urls on the server https://stackoverflow.com/questions/35137936/can-i-let-node-js-generate-a-canvas-without-an-html-page
 */

const cacheImages = true;

const getImg = ({ poly, width = 600, height = 300 }) => {
  //return "";
  return (
    "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/path-4+fc5200-0.75(" +
    encodeURIComponent(poly) +
    `)/auto/${width}x${height}@2x` +
    `?access_token=${process.env.REACT_APP_MAPBOX}`
  );
};

const StravaCard = props => {
  const { name, type, map, start_date, distance, moving_time } =
    props.data || {};
  const tz = moment.tz.guess();
  const miles = 0.000621371192237 * distance;
  const mph = miles / (moving_time / 60 / 60);
  const duration = moment
    .utc(moment.duration(moving_time, "seconds").asMilliseconds())
    .format("H [hr] m [min]")
    .replace("0 hr ", "");

  const minPerMile = moving_time / 60 / miles;
  const paceType = type === "Run" ? "Mins per mile" : "MPH";
  const pace =
    type === "Run"
      ? moment
          .utc(moment.duration(minPerMile, "minutes").asMilliseconds())
          .format("m:ss")
      : mph.toFixed(2);

  const src = getImg({ poly: map.summary_polyline });

  return (
    <div className="strava-card" style={props.style || {}}>
      <div className="top">
        <div className="title-container">
          <img
            src="https://dgalywyr863hv.cloudfront.net/pictures/athletes/802863/634527/2/medium.jpg"
            alt="Strava Thumbnail"
            width="60"
            height="60"
            className="thumb"
          />
          <div className="title-container">
            <h3 className="title">{name}</h3>
            <p className="subtitle">
              {moment
                .tz(new Date(start_date), tz)
                .format("MMM DD, YYYY h:mm a z")}
            </p>
          </div>
        </div>
        <div className="stat-container">
          <div className="stat-item">
            {type === "Run" && <MdDirectionsRun className="icon type-icon" />}
            {type === "Ride" && <MdDirectionsBike className="icon type-icon" />}
            <span className="subtitle">{type}</span>
          </div>
          <div className="stat-item">
            <span className="value">{miles.toFixed(2)}</span>
            <span className="subtitle">Miles</span>
          </div>
          <div className="stat-item">
            <span className="value">{duration}</span>
            <span className="subtitle">Duration</span>
          </div>
          <div className="stat-item">
            <span className="value">{pace}</span>
            <span className="subtitle">{paceType}</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="img-container">
          {map && map.summary_polyline && (
            <>
              {cacheImages ? (
                <CacheImage
                  alt={`Map of ${type}`}
                  src={src}
                  id={src.substr(80, 20)}
                  className="map"
                />
              ) : (
                <img
                  alt={`Map of ${type}`}
                  src={src}
                  id={src.substr(80, 20)}
                  className="map"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(StravaCard);
