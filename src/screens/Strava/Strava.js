import React, { useState, useEffect, memo } from 'react';
import './style.scss';
import api from '../../api/api';
import { connect } from 'react-redux';
import { setStrava } from '../../redux/actions/strava';
import StravaCard from '../../components/StravaCard/StravaCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash';
import Loader from '../../components/Loader/Loader';
import { dataNeedsReset } from '../../utils/utils';

const fetchLimit = 10;
const sorter = (a, b) => new Date(b.start_date) - new Date(a.start_date);

const Row = memo(data => <StravaCard {...data} />);

const Strava = props => {
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [stateFeed, setStateFeed] = useState(
    (props.strava.data || []).sort(sorter)
  );
  const [hasMore, setHasMore] = useState(true);

  const getStravaFeed = opts => {
    if (loadingFeed) return;
    opts = opts || {
      limit: fetchLimit,
      after:
        (stateFeed.length && stateFeed[stateFeed.length - 1].start_date) ||
        undefined
    };

    setLoadingFeed(true);
    api.strava
      .fetchStrava(opts)
      .then(feed => {
        let newData;
        if (feed.length) {
          // START NEW
          if (opts.reset) {
            newData = _.uniqBy(feed, 'id').sort(sorter);
          } else {
            newData = _.uniqBy(stateFeed.concat(feed), 'id').sort(sorter);
          }
          //props.setFeed(_.uniqBy(newData.slice(0, 10), "id"));
        }
        props.setStrava(_.uniqBy(newData.slice(0, fetchLimit), 'id'));
        setStateFeed(newData);
        setLoadingFeed(false);
        if (feed.length < (opts.limit || fetchLimit)) {
          setHasMore(false);
        }
      })
      .catch(err => {
        setLoadingFeed(false);
      });
  };

  useEffect(() => {
    const reset = dataNeedsReset(props.strava, 1);
    getStravaFeed({
      limit: fetchLimit,
      after: new Date().toISOString(),
      reset
    });
  }, [props]);

  return (
    <div className="page-strava">
      {stateFeed.length !== 0 && (
        <div id="scroll-cont" className="scroll-container">
          <InfiniteScroll
            scrollableTarget="scroll-cont"
            dataLength={stateFeed.length} //This is important field to render the next data
            next={() => getStravaFeed()}
            hasMore={hasMore}
            loading={loadingFeed}
            loader={<Loader />}
          >
            {stateFeed.map(it => it && <Row {...it} key={it.id} />)}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default connect(
  state => ({
    strava: state.strava || {}
  }),
  dispatch => ({
    setStrava: data => dispatch(setStrava(data))
  })
)(Strava);
