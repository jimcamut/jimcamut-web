import React from "react";

const defaultExpire = 1000 * 60 * 60 * 24 * 7;

function getBase64Image(img) {
  const canvas = document.createElement("canvas");

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

const CacheImage = props => {
  let src = props.src;
  try {
    const id = props.id || Math.random();
    const existing = localStorage.getItem(id);
    const expired =
      existing &&
      new Date().getTime() - new Date(JSON.parse(existing).expire).getTime() >
        0;

    const existingSRC = !expired && existing && JSON.parse(existing).src;

    if (existingSRC) {
      src = "data:image/png;base64," + existingSRC;
    }

    const imageLoaded = () => {
      try {
        if (existingSRC) return;
        const img = document.getElementById(id);
        img.setAttribute("crossOrigin", "anonymous");
        const base64 = getBase64Image(img);
        localStorage.setItem(
          id,
          JSON.stringify({
            src: base64,
            expire: new Date().setMilliseconds(props.expire || defaultExpire)
          })
        );
      } catch (e) {}
    };

    return (
      <img
        {...props}
        id={id}
        alt={props.alt || "Image"}
        src={src}
        onLoad={() => imageLoaded()}
        crossOrigin="Anonymous"
      />
    );
  } catch (e) {
    return <img {...props} alt={props.alt || "Image"} />;
  }
};

export default CacheImage;
