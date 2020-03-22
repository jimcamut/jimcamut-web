import React from 'react';
import './style.scss';

const GramCard = ({ id, media_url, media_type, public_urls, onClick }) => {
  const src = (
    (public_urls || []).find(it => it && it.match(/760x760.jpg$|video.mp4$/)) ||
    media_url ||
    ''
  ).replace('jimcamut-ig.s3.amazonaws.com', 'd1yq900l6wf9lh.cloudfront.net');

  return (
    <div
      className={`gram-card${onClick ? ' clickable' : ''}`}
      onClick={() => (onClick ? onClick() : null)}
    >
      {['IMAGE', 'CAROUSEL_ALBUM'].includes(media_type) && (
        <img src={src} alt={`ig-${id}`} />
      )}
      {media_type === 'VIDEO' && (
        <video alt={`ig-${id}`} controls>
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default GramCard;
