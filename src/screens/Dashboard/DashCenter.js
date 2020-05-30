import React from 'react';
import './style.scss';
import StravaCard from '../../components/StravaCard/StravaCard';
import TwitterCard from '../../components/TwitterCard/TwitterCard';
import GramCard from '../../components/GramCard/GramCard';
import { Link } from 'react-router-dom';
import Workouts from '../../components/Workouts/Workouts';
import Card from '../../components/Card/Card';

const filterWeeks = arr => arr; //(arr || []).filter(it => it && it.week_miles);

const DashCenter = props => {
  const { dashData } = props || {};
  const data = dashData || {};
  const { run_weeks, bike_weeks, tweet, strava, gram } = data || {};

  const run_weeks_filtered = filterWeeks(run_weeks);
  const bike_weeks_filtered = filterWeeks(bike_weeks);

  return (
    <div className="dashcenter">
      <div className="flex-grid-halfs">
        <div className="col">
          <Workouts
            run_weeks={run_weeks_filtered}
            bike_weeks={bike_weeks_filtered}
          />
          <Link to="strava">See More Strava</Link>
        </div>
        {strava && (
          <div className="col">
            <StravaCard {...strava} />
            <Link to="strava">See More Strava</Link>
          </div>
        )}
        {tweet && (
          <div className="col">
            <TwitterCard {...tweet} />
            <Link to="tweets">See More Tweets</Link>
          </div>
        )}
        {gram && (
          <div className="col">
            <Card title="Latest Instagram" content={<GramCard {...gram} />} />
            <Link to="grams">See More Grams</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashCenter;
