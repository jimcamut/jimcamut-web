import React, { useState, useEffect, memo } from "react";
import "./style.scss";

import { fetchFeed } from "../../api/api";
import { connect } from "react-redux";
import { setFeed } from "../../redux/actions/feed";
import StravaCard from "../../components/StravaCard/StravaCard";

import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteScroll from "react-infinite-scroller";
import _ from "lodash";

const Row = memo(({ it }) => <StravaCard key={it.id} data={it} />);

const Strava = props => {
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [stateFeed, setStateFeed] = useState(props.feed.data || []);

  const getStravaFeed = opts => {
    if (loadingFeed) return;
    // const last = props.feed.data[]
    opts = opts || {
      limit: 10,
      after:
        (stateFeed.length && stateFeed[stateFeed.length - 1].start_date) ||
        undefined
    };

    setLoadingFeed(true);
    fetchFeed(opts)
      .then(feed => {
        const newData = _.uniqBy(stateFeed.concat(feed), "id");
        props.setFeed(_.uniqBy(newData.slice(0, 10), "id"));
        setStateFeed(newData);
        setLoadingFeed(false);
      })
      .catch(err => {
        setLoadingFeed(false);
      });
  };

  useEffect(() => {
    getStravaFeed({
      limit: 10,
      after: new Date().toISOString()
    });
  }, []);

  return (
    <div className="page-strava">
      {stateFeed.length !== 0 && (
        <AutoSizer>
          {({ height, width }) => {
            return (
              <div className="scroll-container" style={{ height, width }}>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={() => getStravaFeed()}
                  hasMore={true}
                  useWindow={false}
                >
                  {stateFeed.map(it => (
                    <Row key={it.id} it={it} />
                  ))}
                </InfiniteScroll>
              </div>
            );
          }}
        </AutoSizer>
      )}
    </div>
  );
};

export default connect(
  state => ({
    feed: state.feed || {}
  }),
  dispatch => ({
    setFeed: data => dispatch(setFeed(data))
  })
)(Strava);
