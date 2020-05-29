import React from 'react';
import './style.scss';

const About = () => {
  return (
    <div className="page-about">
      {/* <div className="container">
        <div className="inner">
          <div className="section">
            <h1>Coming Soon-ish?</h1>
            <p>Writing your own bio is hard.</p>
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="inner">
          <div className="section">
            <h2>What do you want to know?</h2>

            <p>
              Long story short, I'm a software developer/co-founder living in
              San Francisco with my amazing wife Amanda and our totally bonkers
              Border Collie, Bodie (shameless dog pictures coming).
            </p>

            <p>
              Racing bikes was a huge part of my younger life. I raced in
              Europe, all over North America, and at one point I thought I'd
              make it my career. But things change and I decided to hang up my
              bike and step into the rat race.
            </p>

            <p>
              I had a handfull of jobs after graduating from Penn State with a
              bachelor in Public Relations, but I eventually taught myself how
              to code and decided that I really liked it. Fast forward to 2015,
              and I helped cofound a pet care app, which is called Barkly Pets
              and is operational across the country. I'm still at Barkly Pets
              building our architecture and working with a great crew of people.
            </p>
          </div>

          <div className="section">
            <h3>This Website</h3>
            <p>
              I built this website from scratch, because I'm good at computers
              as someone's grandma once said. If you want to look under the hood
              take a look at the{' '}
              <a
                href="http://github.com/jimcamut/jimcamut-web"
                target="_blank"
                rel="noreferrer noopener"
              >
                front-end
              </a>
              repo I've made public. The backend API Node/Express and
              PostgreSQL.
            </p>
            <p>
              I'm keeping that repo private for security purposes, since it
              handles user accounts and authenticaion.
            </p>
          </div>
          <div className="section">
            <h3>My Dog</h3>
            <p>
              I'm crazy about my good boy to the extent that I have "World's
              Best Border Collie Dad" t-shirts and coffee mugs. My wife also has
              a "World's Best Border Collie Mom" collection. We're crazy, we
              admit it, and now here are some pictures of Bodie.
            </p>

            <div className="gallery square">
              <a
                href="https://www.instagram.com/p/BXMXlQmgPWF/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img alt="Bodie" src={require('./img/bodie1.jpg')} />
              </a>
              <a
                href="https://www.instagram.com/p/BnTzktChuif/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img alt="Bodie" src={require('./img/bodie2.jpg')} />
              </a>
              <a
                href="https://www.instagram.com/p/BYO4w0zAhOW/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img alt="Bodie" src={require('./img/bodie3.jpg')} />
              </a>

              <a
                href="https://www.instagram.com/p/B0Q81Z1HY-o/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img alt="Bodie" src={require('./img/bodie4.jpg')} />
              </a>
              <a
                href="https://www.instagram.com/p/BYWCwUwg0MJ/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img alt="Bodie" src={require('./img/bodie5.jpg')} />
              </a>

              <a
                href="https://www.instagram.com/p/BgDFM4tB5W1/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img alt="Bodie" src={require('./img/bodie6.jpg')} />
              </a>
              <a
                href="https://www.instagram.com/p/Bea5CdgAD3I/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img alt="Bodie" src={require('./img/bodie7.jpg')} />
              </a>
              <a
                href="https://www.instagram.com/p/BwDIhQzhTsX/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img alt="Bodie" src={require('./img/bodie8.jpg')} />
              </a>
              <a
                href="https://www.instagram.com/p/BiFXSvXBjv0/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img alt="Bodie" src={require('./img/bodie9.jpg')} />
              </a>
            </div>
          </div>

          <div className="section">
            <h3>Fun Facts</h3>
            <ul>
              <li>
                I raced on Lance Armstrong's time-trial bike in stage races, and
                our team mechanic would put a piece of black tape over the name
                on the frame so it wouldn't cause too much attention.
              </li>
            </ul>
          </div>

          <div className="section">
            <h3>Cycling</h3>
            <p>
              <a href="https://www.cyclingnews.com/author/jim-camut/">
                CyclingNews.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
