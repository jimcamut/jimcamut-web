import React, { memo } from "react";
import "./style.scss";
import Linkify from "react-linkify";
import moment from "moment-timezone";
import strReplace from "react-string-replace";
const tz = "America/Los_Angeles";

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
        {image && !image.match(/twimg\.com\/profile_images/gi) && (
          <div className="img-container">
            <img src={image} alt="preview" />
          </div>
        )}
        <div className="text-container">
          {title && <h3 className="title">{title}</h3>}
          {description && <p className="description">{description}</p>}
        </div>
      </a>
    </div>
  );
};

const TwitterCard = memo(
  ({
    id,
    text,
    entities,
    urlPreview,
    style,
    created_at,
    name = "@jimcamut"
  }) => {
    const image = (
      ((entities || {}).media || []).find(m => m && m.media_url_https) || {}
    ).media_url_https;

    try {
      text = text || "";
    } catch (e) {
      console.log(e);
    }

    const hashified = strReplace(text, /(#[a-z\d][\w-]*)/gi, (match, i) => (
      <a
        key={`hash-${i}`}
        href={`https://twitter.com/hashtag/${match.toLowerCase()}`}
      >
        {match}
      </a>
    ));

    const taggifed = strReplace(hashified, /(@[a-z\d][\w-]*)/gi, (match, i) => (
      <a key={`tag-${i}`} href={`https://twitter.com/${match.toLowerCase()}`}>
        {match}
      </a>
    ));

    return (
      <div className="twitter-card" style={style || {}}>
        <div className="top">
          <div className="title-container">
            <img
              src="https://pbs.twimg.com/profile_images/860501508193869825/tXZqrevX_400x400.jpg"
              alt="Twitter Thumbnail"
              width="60"
              height="60"
              className="thumb"
            />
            <div className="title-container">
              <h3 className="title">{name}</h3>
              <p className="subtitle">
                {moment
                  .tz(new Date(created_at), tz)
                  .format("MMM DD, YYYY h:mm a z")}
              </p>
            </div>
          </div>
        </div>
        <div className="bottom">
          {text && text.length > 0 && (
            <div className="text-container">
              <Linkify>
                <p>{taggifed}</p>
              </Linkify>
            </div>
          )}
        </div>
        {urlPreview && <LinkPreview {...urlPreview} />}
        {image && (
          <div className="img-container">
            <img className="media" src={image} alt="twitter media" />
          </div>
        )}
      </div>
    );
  }
);

export default TwitterCard;
