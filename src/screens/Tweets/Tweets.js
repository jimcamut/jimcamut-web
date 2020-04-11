import React, { useState, useEffect } from 'react';
import './style.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchTweets } from '../../api/api';
import _ from 'lodash';
import Loader from '../../components/Loader/Loader';
import TwitterCard from '../../components/TwitterCard/TwitterCard';
import { connect } from 'react-redux';
import { setTweets } from '../../redux/actions/tweets';

const sorter = (a, b) => new Date(b.created_at) - new Date(a.created_at);
const fetchLimit = 20;

let Tweets = props => {
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [stateFeed, setStateFeed] = useState(
    (props.tweets.data || []).sort(sorter)
  );
  const [hasMore, setHasMore] = useState(true);

  const getTweetsFeed = opts => {
    if (loadingFeed) return;
    // const last = props.feed.data[]
    opts = opts || {
      limit: fetchLimit,
      after:
        (stateFeed.length &&
          new Date(stateFeed[stateFeed.length - 1].created_at).toISOString()) ||
        undefined
    };

    setLoadingFeed(true);
    fetchTweets(opts)
      .then(feed => {
        let newData;
        if (feed.length) {
          newData = _.uniqBy(stateFeed.concat(feed), 'id').sort(sorter);
        }
        props.setTweets(_.uniqBy(newData.slice(0, fetchLimit), 'id'));
        setStateFeed(newData);
        setLoadingFeed(false);

        if (feed.length < (opts.limit || fetchLimit)) {
          setHasMore(false);
        }
      })
      .catch(err => {
        // console.log(err);
        setLoadingFeed(false);
      });
  };

  useEffect(() => {
    getTweetsFeed({ limit: fetchLimit });
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

export default connect(
  state => ({
    tweets: state.tweets || {}
  }),
  dispatch => ({
    setTweets: data => dispatch(setTweets(data))
  })
)(Tweets);
