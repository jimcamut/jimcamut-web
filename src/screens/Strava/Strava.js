import React, { useState, useEffect, memo } from "react";
import "./style.scss";
import { fetchFeed } from "../../api/api";
import { connect } from "react-redux";
import { setFeed } from "../../redux/actions/feed";
import StravaCard from "../../components/StravaCard/StravaCard";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";

const fetchLimit = 10;

const Row = memo(({ it }) => <StravaCard key={it.id} data={it} />);

const Strava = props => {
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [stateFeed, setStateFeed] = useState(props.feed.data || []);
  const [hasMore, setHasMore] = useState(true);

  const getStravaFeed = opts => {
    console.log("getting");
    if (loadingFeed) return;
    // const last = props.feed.data[]
    opts = opts || {
      limit: fetchLimit,
      after:
        (stateFeed.length && stateFeed[stateFeed.length - 1].start_date) ||
        undefined
    };

    setLoadingFeed(true);
    fetchFeed(opts)
      .then(feed => {
        const newData = _.uniqBy(stateFeed.concat(feed), "id");
        props.setFeed(_.uniqBy(newData.slice(0, fetchLimit), "id"));
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
    getStravaFeed({
      limit: fetchLimit,
      after: new Date().toISOString()
    });
  }, []);

  return (
    <div className="page-strava">
      {stateFeed.length !== 0 && (
        <div
          id="scroll-cont"
          className="scroll-container"
          style={{ height: "fetchLimit0%", width: "fetchLimit0%" }}
        >
          <InfiniteScroll
            // pageStart={0}
            // loadMore={() => getStravaFeed()}
            // hasMore={true}
            // useWindow={false}

            scrollableTarget="scroll-cont"
            dataLength={stateFeed.length} //This is important field to render the next data
            next={() => getStravaFeed()}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // below props only if you need pull down functionality
            // refreshFunction={() => console.log("refresh")}
            // pullDownToRefresh
            // pullDownToRefreshContent={
            //   <h3 style={{ textAlign: "center" }}>
            //     &#8595; Pull down to refresh
            //   </h3>
            // }
            // releaseToRefreshContent={
            //   <h3 style={{ textAlign: "center" }}>
            //     &#8593; Release to refresh
            //   </h3>
            // }
          >
            {stateFeed.map(it => (
              <Row key={it.id} it={it} />
            ))}
          </InfiniteScroll>
        </div>
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
