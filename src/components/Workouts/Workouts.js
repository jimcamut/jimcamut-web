import React, { useState, memo } from 'react';
import './style.scss';
import moment from 'moment-timezone';
import Card from '../Card/Card';
import StatContainer from '../StravaCard/StatContainer/StatContainer';
import Graph from './Graph/Graph';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const tz = 'America/Los_Angeles';

const WeekGraph = ({ week, type = 'Run', toggleWeek, weekIdx }) => {
  if (!week) return null;
  const { week_start, week_miles, week_seconds = 0, week_daily } = week || {};
  const weekSet = week_daily || [null, null, null, null, null, null, null];
  const start = new Date(week_start);
  const end = new Date(new Date(start).setDate(start.getDate() + 7));

  const mph = week_miles / (week_seconds / 60 / 60);
  const duration = moment
    .utc(moment.duration(week_seconds, 'seconds').asMilliseconds())
    .format('H [hr] m [min]')
    .replace('0 hr ', '');

  const minPerMile = (week_seconds || 0) / 60 / (week_miles || 0);
  const paceType = type === 'Run' ? 'Per mile' : 'MPH';
  let pace =
    type === 'Run'
      ? moment
          .utc(moment.duration(minPerMile, 'minutes').asMilliseconds())
          .format('m:ss')
      : mph.toFixed(2);
  pace = isNaN(pace) ? '0:00' : pace;

  const max = weekSet.reduce(
    (max = 0, set = [null, 0]) =>
      set && set[1] && set[1] > max ? set[1] : max,
    []
  );

  const title = `Week of ${moment.tz(start, tz).format('M/D')}-${moment
    .tz(end, tz)
    .format('M/D')}`;

  return (
    <Card
      className="workout-card"
      title={title}
      topExtra={
        <StatContainer
          type={type}
          miles={week_miles}
          duration={duration}
          pace={pace}
          paceType={paceType}
        />
      }
      content={
        <div className="graph-container">
          <div
            className={`arrow${weekIdx < 1 ? ' hide' : ''}`}
            onClick={() => toggleWeek(true)}
          >
            <MdKeyboardArrowLeft className="icon" />
          </div>
          <Graph weekSet={weekSet} title={title} max={max} />
          <div
            className={`arrow${weekIdx > 2 ? ' hide' : ''}`}
            onClick={() => toggleWeek(false)}
          >
            <MdKeyboardArrowRight className="icon" />
          </div>
        </div>
      }
    />
  );
};

const Workouts = memo(({ run_month, bike_month }) => {
  if (!run_month) return null;
  const [weekIdx, setWeekIdx] = useState(3);
  const set = run_month;
  const week = set[weekIdx];

  if (!week) return null;

  const toggleWeek = back => {
    const newIdx = back ? weekIdx - 1 : weekIdx + 1;
    if (newIdx < 0 || newIdx > 3) return;
    setWeekIdx(newIdx);
  };

  return <WeekGraph week={week} toggleWeek={toggleWeek} weekIdx={weekIdx} />;
});

export default Workouts;
