import React, { memo } from "react";
import "./style.scss";

const Card = memo(props => {
  const { className, title, subtitle, thumb, topExtra, content, style, extra } =
    props || {};
  const showTitle = title || subtitle || thumb;
  return (
    <div
      className={`card${className ? " " + className : ""}`}
      style={style || {}}
    >
      <div className="top">
        {showTitle && (
          <>
            <div className="title-container">
              {thumb && (
                <img
                  src={thumb}
                  alt="thumbnail"
                  width="60"
                  height="60"
                  className="thumb"
                />
              )}
              <div className="title-container">
                {title && <h3 className="title">{title}</h3>}
                {subtitle && <p className="subtitle">{subtitle}</p>}
              </div>
            </div>
            {topExtra}
          </>
        )}
      </div>
      {content && <div className="bottom">{content}</div>}
      {extra}
    </div>
  );
});

export default Card;
