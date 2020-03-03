import React, { useState, memo } from "react";
import "./style.scss";
import Linkify from "react-linkify";
import { ReactTinyLink } from "react-tiny-link";

const LinkPreview = ({
  author,
  date,
  description,
  image,
  logo,
  publisher,
  title,
  url
}) => {
  return (
    <div className="link-preview">
      <a href={url}>
        {image && (
          <div className="img-container">
            <img src={image} alt="preview" />
          </div>
        )}
        <div className="text-container">
          <h3>{title}</h3>
          <span>{date}</span>
          <span>{publisher}</span>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
};

const TwitterCard = memo(({ id, text, entities, urlPreview }) => {
  return (
    <div className="twitter-card">
      <Linkify>
        <p>{text}</p>
      </Linkify>

      {urlPreview && <LinkPreview {...urlPreview} />}
    </div>
  );
});

export default TwitterCard;
