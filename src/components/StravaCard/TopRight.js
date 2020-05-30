import React, { useState } from 'react';
import './style.scss';
import Lightbox from '../Lightbox/Lightbox';

const TopRight = ({ images }) => {
  const [lighboxIdx, setLighboxIdx] = useState(0);
  if (!(images || []).length) return null;

  const thumbnails = (images || []).filter(it => it && it.size === '100');
  const fullImages = (images || []).filter(it => it && it.size === '1000');
  const sources = fullImages.length ? fullImages.map(it => it.url) : [];

  const showImage = id => {
    const idx = fullImages.findIndex(it => it && it.unique_id === id);
    if (idx > -1) setLighboxIdx(idx + 1);
  };

  return (
    <>
      <div className="images-container">
        {thumbnails.map(it => (
          <img
            key={it.unique_id}
            alt=""
            src={it.url}
            onClick={() => showImage(it.unique_id)}
          />
        ))}
      </div>

      <Lightbox
        index={lighboxIdx}
        sources={sources}
        close={() => setLighboxIdx(0)}
        setIndex={n => setLighboxIdx(n)}
      />
    </>
  );
};

export default TopRight;
