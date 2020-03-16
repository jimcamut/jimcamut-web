import React from "react";
import "./style.scss";

const GramCard = ({ id, media_url, media_type }) => (
  <div className="gram-card">
    {["IMAGE", "CAROUSEL_ALBUM"].includes(media_type) && (
      <img src={media_url} alt={`ig-${id}`} />
    )}
    {media_type === "VIDEO" && (
      <video alt={`ig-${id}`} controls>
        <source src={media_url} type="video/mp4" />
      </video>
    )}
  </div>
);

export default GramCard;
