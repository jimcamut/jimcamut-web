import React from 'react';
import './style.scss';
import moment from 'moment';

const ReplaceLinks = ({ str }) => {
  const linkRegExp = /(\(.*\)\[.*\])/gi;
  let parts = str.split(linkRegExp);

  for (var i = 1; i < parts.length; i += 2) {
    if (parts[i].match(linkRegExp)) {
      const arr = /\((.*)\)\[(.*)\]/gi.exec(parts[i]);
      parts[i] = (
        <a key={i} href={arr[2]}>
          {arr[1]}
        </a>
      );
    }
  }
  return <li>{parts}</li>;
};

const ResumeBody = ({ sections, updated }) => (
  <div className="resume-body">
    <div className="meta">
      <p>
        For a PDF version of my resume, please{' '}
        <a href="mailto:jim@jimcamut.com?subject=Resume&body=Hi Jim, I would like a copy of your resume.">
          email me
        </a>
        .
      </p>
    </div>

    {sections.map((section, i) => (
      <section className="topic-section" key={i}>
        <h2>{section.title}</h2>
        {typeof section.content === 'string' &&
          section.content.split(/\n/).map((it, j) => <p key={j}>{it}</p>)}

        {Array.isArray(section.content) &&
          section.content.map((it, k) => (
            <div className="job-section" key={k}>
              <header className="header">
                <div className="left">
                  <h3>{it.title}</h3>
                  {it.subtitle && <h4>{it.subtitle}</h4>}
                </div>
                <div className="right">
                  {it.dates && <span>{it.dates}</span>}
                </div>
              </header>
              <ul>
                {it.content.map((li, m) => (
                  <ReplaceLinks key={m} str={li} />
                ))}
              </ul>
            </div>
          ))}
      </section>
    ))}
  </div>
);

export default ResumeBody;
