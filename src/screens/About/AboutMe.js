import React, { useState, useEffect } from 'react';
import './style.scss';
import { loadTOC } from './utils';
import Lightbox from '../../components/Lightbox/Lightbox';

const AboutMe = () => {
  const [cyclingLighboxIdx, setCyclingLighboxIdx] = useState(0);
  const [bodieLighboxIdx, setBodieLighboxIdx] = useState(0);

  useEffect(() => {
    loadTOC('about-me');
  }, []);

  const cyclingThumbnails = Array.from(Array(21).keys()).map(
    n =>
      `https://d1i3ck8kwx4jf7.cloudfront.net/public/website/cycling/cycling${n +
        1}.jpg`
  );

  const bodieThumbnails = Array.from(Array(9).keys()).map(
    n =>
      `https://d1i3ck8kwx4jf7.cloudfront.net/public/website/bodie/bodie${n +
        1}.jpg`
  );

  const showCyclingImage = url => {
    const idx = cyclingThumbnails.findIndex(it => it === url);
    if (idx > -1) setCyclingLighboxIdx(idx + 1);
  };

  const showBodieImage = url => {
    const idx = bodieThumbnails.findIndex(it => it === url);
    if (idx > -1) setBodieLighboxIdx(idx + 1);
  };

  return (
    <>
      <div className="inner about-me">
        <div className="table-of-contents"></div>
        <div className="content">
          <div className="section">
            <h2>TL:DR;</h2>

            <p>
              I live in San Francisco with my amazing wife Amanda and our
              totally bonkers Border Collie, Bodie (shameless dog pictures to
              follow).
            </p>

            <p>
              I work in tech now, but racing bikes was a huge part of my earlier
              life. I raced in Europe and all over North America.
            </p>

            <p>
              I graduated from Penn State University with a bachelors degree in
              Public Relations, but I eventually taught myself how to code and
              decided that I really liked it. Fast forward to 2015 and I
              cofounded a pet care app called Barkly Pets. I'm still at Barkly
              Pets building our architecture and working with a great crew of
              people.
            </p>
          </div>

          <div className="section">
            <h2>This Website</h2>
            <p>
              I built this website from scratch, because I'm "good at the
              computers" as someone's grandma once said. If you want to look
              under the hood,{' '}
              <a
                href="http://github.com/jimcamut/jimcamut-web"
                target="_blank"
                rel="noreferrer noopener"
              >
                here is the repo
              </a>
              . I've built my own backend API on Node/Express and PostgreSQL,
              but I'll keep that repo private since it handles user accounts and
              session tokens.
            </p>
          </div>
          <div className="section">
            <h2>My Dog - As Promised :)</h2>
            <p>
              If you know me, you know that I proudly wear my "World's Best
              Border Collie Dad" t-shirt all the time. My wife and I are crazy
              dog pareents. Eithout futher, adieu, here are some pictures of
              Bodie.
            </p>

            <div className="gallery square">
              {bodieThumbnails.map(url => (
                <div key={url} onClick={() => showBodieImage(url)}>
                  <img alt="" src={url} />
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2>Cycling</h2>
            <p>
              As I mentioned before, I used to race bikes all over. Here is my{' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.cyclingnews.com/author/jim-camut/"
              >
                blog on CyclingNews.com
              </a>{' '}
              from when I raced in Europe.
            </p>

            <p>And here are a few photos from back in the day:</p>
            <div className="gallery square">
              {cyclingThumbnails.map(url => (
                <div key={url} onClick={() => showCyclingImage(url)}>
                  <img alt="" src={url} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Lightbox
        index={cyclingLighboxIdx}
        sources={cyclingThumbnails}
        close={() => setCyclingLighboxIdx(0)}
        setIndex={n => setCyclingLighboxIdx(n)}
      />
      <Lightbox
        index={bodieLighboxIdx}
        sources={bodieThumbnails}
        close={() => setBodieLighboxIdx(0)}
        setIndex={n => setBodieLighboxIdx(n)}
      />
    </>
  );
};

export default AboutMe;
