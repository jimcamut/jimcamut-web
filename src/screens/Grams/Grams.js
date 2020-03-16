import React, { useState, useEffect, memo } from "react";
import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchGrams } from "../../api/api";
import _ from "lodash";
import Loader from "../../components/Loader/Loader";
import GramCard from "../../components/GramCard/GramCard";

const sorter = (a, b) => b.timestamp - a.timestamp;
const fetchLimit = 10;

const Grams = () => {
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
              stateFeed.map((data, idx) => <GramCard {...data} key={idx} />)}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Grams;
