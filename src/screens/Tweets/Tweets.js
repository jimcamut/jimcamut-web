import React, { useState, useEffect } from "react";
import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchTweets } from "../../api/api";
import _ from "lodash";
import Loader from "../../components/Loader/Loader";
import TwitterCard from "../../components/TwitterCard/TwitterCard";

const sorter = (a, b) => b.created_at - a.created_at;
const fetchLimit = 20;

let Tweets = () => {
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [stateFeed, setStateFeed] = useState(/*props.feed.data || */ []);
  const [hasMore, setHasMore] = useState(true);

  const getTweetsFeed = opts => {
    console.log("getting", opts);
    if (loadingFeed) return;
    // const last = props.feed.data[]
    opts = opts || {
      limit: fetchLimit,
      after:
        (stateFeed.length &&
          new Date(stateFeed[stateFeed.length - 1].created_at).toISOString()) ||
        undefined
    };

    try {
      console.log(stateFeed, stateFeed.length - 1);
    } catch (e) {}

    console.log(opts.after);

    setLoadingFeed(true);
    fetchTweets(opts)
      .then(feed => {
        console.log("GOT", feed);
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
        console.log(err);
        setLoadingFeed(false);
      });
  };

  useEffect(() => {
    getTweetsFeed({
      limit: fetchLimit
    });
  }, []);

  return (
    <div className="page-tweets">
      {stateFeed.length !== 0 && (
        <div id="scroll-cont" className="scroll-container">
          <InfiniteScroll
            scrollableTarget="scroll-cont"
            dataLength={stateFeed.length} //This is important field to render the next data
            next={() => getTweetsFeed()}
            hasMore={hasMore}
            loading={loadingFeed}
            loader={<Loader />}
          >
            {stateFeed.map(it => (
              <TwitterCard {...it} key={it.id} />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Tweets;
