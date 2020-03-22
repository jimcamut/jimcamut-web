import React, { memo, useState, useEffect } from 'react';
import './style.scss';
import { MdClose } from 'react-icons/md';
import Loader from '../Loader/Loader';

const Lightbox = ({ sources, index = 0, close, setIndex }) => {
  const src = sources[index - 1];
  const isVideo = src && src.match(/\.mp4$/);
  const [orientation, setOrientation] = useState('square');
  const [loading, setLoading] = useState(true);

  const onImgLoad = e => {
    const w = e.target.naturalWidth;
    const h = e.target.naturalHeight;
    const orientation = w === h ? 'square' : w > h ? 'landscape' : 'portrait';
    setOrientation(orientation);
    setLoading(false);
  };

  const _handleKeyDown = event => {
    switch (event.keyCode) {
      case 27:
        closeWrapper();
        break;
      case 39:
        if (index === sources.length) break;
        setLoading(true);
        setIndex(index + 1);
        break;
      case 37:
        console.log('index', index);
        if (index === 1) break;
        setLoading(true);
        setIndex(index - 1);
        break;
      default:
        break;
    }
  };

  // componentWillMount deprecated in React 16.3
  const listenForKeys = () => {
    if (!src) return;
    document.addEventListener('keydown', _handleKeyDown);
  };

  const unListenForKeys = () => {
    document.removeEventListener('keydown', _handleKeyDown);
  };

  const closeWrapper = () => {
    unListenForKeys();
    close();
  };

  useEffect(() => {
    listenForKeys();
    return unListenForKeys;
  }, [index]);

  if (!(sources && sources.length && sources[index - 1])) return null;

  return (
    <div className={`lightbox${src ? ' ' + 'active' : ''}`}>
      <div className="backdrop" onClick={closeWrapper}></div>
      {loading && !isVideo && <Loader />}
      {src && !isVideo && (
        <img
          onLoad={onImgLoad}
          className={`media ${orientation}`}
          src={src}
          alt="popup"
          style={{ display: loading ? 'none' : 'block' }}
        />
      )}
      {src && isVideo && (
        <video className="media" alt={`ig-${src}`} controls>
          <source src={src} type="video/mp4" />
        </video>
      )}
      <MdClose className="icon close" onClick={closeWrapper} />
    </div>
  );
};

export default memo(Lightbox);
