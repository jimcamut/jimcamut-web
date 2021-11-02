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

  const setLBX = (url, arr, func) => {
    const idx = arr.findIndex(it => it === url);
    if (idx > -1) func(idx + 1);
  };

  const showCyclingImage = url =>
    setLBX(url, cyclingThumbnails, setCyclingLighboxIdx);

  const showBodieImage = url =>
    setLBX(url, bodieThumbnails, setBodieLighboxIdx);

  return (
    <>
      <div className="inner about-me">
        <div className="table-of-contents"></div>
        <div className="content">
          <div className="section">
            <h2>About</h2>
            <p>
              Jim Camut is an entrepreneur, startup CTO, and full-stack software
              engineer who designed, engineered and{' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://barklypets.com"
              >
                co-founded
              </a>{' '}
              one of the country’s first marketplace apps for pet care. He has
              worked across several industries including identity management,
              health technology, pet care technology and database analytics. He
              maintains a passion for bootstrapping new products and
              technologies and getting them to market at lightning speed. 
            </p>

            <p>
              With a decade of experience working across product, marketing and
              engineering teams - Jim brings cohesion and wholistic thinking
              between them. His expertise is in maturing technologies and the
              teams that build them, but his biggest passion is still writing
              code.
            </p>

            <p>
              After building the technology for his startup of which he was a
              cofounder, Jim is now an advisor to several other startups. He
              advises in go-to-market strategies, analyzing and architecting
              tech solutions and helping to scale technologies.
            </p>
            <p>
              Outside of work, Jim is an avid cyclist and runner and loves
              enjoying the outdoors with his wife and growing family in the Bay
              Area.
            </p>
          </div>

          <div className="section">
            <h2>This Website</h2>
            <p>
              I built this website to pull in some dynamic feeds (Strava,
              Twitter and Instragram) to keep it fresh. There's not anything
              super sophisitcated happening, but if you want to look under the
              hood,{' '}
              <a
                href="http://github.com/jimcamut/jimcamut-web"
                target="_blank"
                rel="noreferrer noopener"
              >
                here is the repo
              </a>{' '}
              for the front end. The backend uses Node/Express and PostgreSQL to
              integrate with the social APIs, and to archive my own data.
            </p>
          </div>

          <div className="section">
            <h2>Current Projects</h2>
            <p>
              I'm currently working on a personal project to supercharge the
              Gmail experience called{' '}
              <a
                href="https://www.nboxer.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                nboxer
              </a>
              , and I also currently use it as email client. This app integrates
              with your Gmail account and enhances it with a number of
              productivity features like todo lists attached to emails,
              auto-saving attachments outside of Gmail, and auto-curating emails
              that need your reply. Right now the project is in private beta and
              Google will need to conduct a $10-75k audit to approve it for
              public use beyond 100 users. If you're interested in getting
              access or even helping to fund the audit, please contact me at{' '}
              <span
                className="email"
                data-user="jim"
                data-domain="jimcamut.com"
              />{' '}
              or visit the website and get your name on the waitlist.
            </p>
            <p>
              <img
                src={require('../../assets/img/nboxer-action.gif')}
                style={{ width: '100%' }}
                alt="nboxer animation"
              />
            </p>
          </div>

          <div className="section">
            <h2>Bodie</h2>
            <p>
              If you build your own website, you can reserve a section for your
              dog. This is Bodie and he's the best.
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
              I used to race bikes in Europe and all over North America. Here is
              my{' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.cyclingnews.com/author/jim-camut/"
              >
                blog on CyclingNews.com
              </a>
              , and here are a few photos from back in the day:
            </p>

            <p></p>
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
