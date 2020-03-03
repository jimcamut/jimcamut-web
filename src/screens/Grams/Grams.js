import React, { useState, useEffect, memo } from "react";
import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchGrams } from "../../api/api";
// import { connect } from "react-redux";
// import { setFeed } from "../../redux/actions/feed";
// import StravaCard from "../../components/StravaCard/StravaCard";
import _ from "lodash";
import Loader from "../../components/Loader/Loader";

const sorter = (a, b) => b.timestamp - a.timestamp;
const fetchLimit = 10;

const Gram = ({ id, media_url, media_type }) => (
  <div className="image-item">
    {["IMAGE", "CAROUSEL_ALBUM"].includes(media_type) && (
      <img src={media_url} alt={`ig-${id}`} />
    )}
    {media_type === "VIDEO" && (
      <video alt={`ig-${id}`} controls>
        <source src={media_url} type="video/mp4" />
      </video>
    )}
  </div>
);

let Grams = () => {
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [stateFeed, setStateFeed] = useState(/*props.feed.data || */ []);
  const [hasMore, setHasMore] = useState(true);

  const getGramsFeed = opts => {
    console.log("getting", opts);
    if (loadingFeed) return;
    // const last = props.feed.data[]
    opts = opts || {
      limit: fetchLimit,
      after:
        (stateFeed.length && stateFeed[stateFeed.length - 1].timestamp) ||
        undefined
    };

    setLoadingFeed(true);
    fetchGrams(opts)
      .then(feed => {
        let newData;
        if (feed.length) {
          newData = _.uniqBy(stateFeed.concat(feed), "id").sort(sorter);
          //props.setFeed(_.uniqBy(newData.slice(0, 10), "id"));
        }
        setStateFeed(newData);
        setLoadingFeed(false);

        if (feed.length < (opts.limit || fetchLimit)) {
          console.log("ENOUGHHHHH", feed.length, opts.limit, fetchLimit);
          setHasMore(false);
        }
      })
      .catch(err => {
        setLoadingFeed(false);
      });
  };

  useEffect(() => {
    getGramsFeed({
      limit: fetchLimit
    });
  }, []);

  return (
    <div className="page-grams">
      <div
        id="grams-scroll-cont"
        className="scroll-container"
        style={{ height: "100%", width: "100%", overflow: "scroll" }}
      >
        <InfiniteScroll
          dataLength={stateFeed.length}
          next={() => getGramsFeed()}
          hasMore={hasMore}
          loading={loadingFeed}
          scrollableTarget="grams-scroll-cont"
          loader={<Loader />}
        >
          <div className="image-grid">
            {stateFeed.length &&
              stateFeed.map((data, idx) => <Gram {...data} key={idx} />)}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Grams;
