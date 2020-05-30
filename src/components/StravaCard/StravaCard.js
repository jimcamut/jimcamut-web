import React, { memo } from 'react';
import './style.scss';
import moment from 'moment-timezone';
import CacheImage from '../CacheImage/CacheImage';
import { cacheImages, getGoogleImg, getStravaImg } from './constants';
import Card from '../Card/Card';
import StatContainer from './StatContainer/StatContainer';
import TopRight from './TopRight';

const StravaCard = props => {
  const {
    name,
    type,
    map,
    start_date,
    distance,
    moving_time,
    photos,
    description
  } = props || {};
  if (!map) return null;
  const tz = moment.tz.guess();
  const miles = 0.000621371192237 * distance;
  const mph = miles / (moving_time / 60 / 60);
  const duration = moment
    .utc(moment.duration(moving_time, 'seconds').asMilliseconds())
    .format('H [hr] m [min]')
    .replace('0 hr ', '');

  const minPerMile = moving_time / 60 / miles;
  const paceType = type === 'Run' ? 'Per mile' : 'MPH';
  const pace =
    type === 'Run'
      ? moment
          .utc(moment.duration(minPerMile, 'minutes').asMilliseconds())
          .format('m:ss')
      : mph.toFixed(2);

  const src = getStravaImg({ poly: map.summary_polyline });

  const imgId = src.substr(80, 20);

  const onMapError = (src, id) => {
    const isMapbox = src.match(/mapbox/gi);
    let newUrl = '';
    if (isMapbox) {
      newUrl = getGoogleImg({ poly: map.summary_polyline });
    }
    document.getElementById(id).src = newUrl;
  };

  const images = (photos || {}).all || [];

  return (
    <Card
      className="strava-card"
      thumb="https://dgalywyr863hv.cloudfront.net/pictures/athletes/802863/634527/2/medium.jpg"
      title={name}
      topRight={<TopRight images={images} />}
      subtitle={moment
        .tz(new Date(start_date), tz)
        .format('MMM DD, YYYY h:mm a z')}
      topExtra={
        <StatContainer
          type={type}
          miles={miles}
          duration={duration}
          pace={pace}
          paceType={paceType}
          description={description}
          images={images}
        />
      }
      content={
        <div className="img-container">
          {map && map.summary_polyline && (
            <>
              {cacheImages ? (
                <CacheImage
                  alt={`Map of ${type}`}
                  src={src}
                  id={imgId}
                  className="map"
                  onError={err => onMapError(src, imgId)}
                />
              ) : (
                <img
                  alt={`Map of ${type}`}
                  src={src}
                  id={imgId}
                  className="map"
                  onError={err => onMapError(src, imgId)}
                />
              )}
            </>
          )}
        </div>
      }
    />
  );
};

export default memo(StravaCard);
