import React, { useState, useEffect } from 'react';
import './style.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchGrams } from '../../api/api';
import _ from 'lodash';
import Loader from '../../components/Loader/Loader';
import GramCard from '../../components/GramCard/GramCard';
import Lightbox from '../../components/Lightbox/Lightbox';

const sorter = (a, b) => b.timestamp - a.timestamp;
const fetchLimit = 10;

const Grams = () => {
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [stateFeed, setStateFeed] = useState(/*props.feed.data || */ []);
  const [hasMore, setHasMore] = useState(true);
  const [lighboxIdx, setLighboxIdx] = useState(0);

  const getGramsFeed = opts => {
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
          newData = _.uniqBy(stateFeed.concat(feed), 'id').sort(sorter);
          //props.setFeed(_.uniqBy(newData.slice(0, 10), "id"));
        }
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
    getGramsFeed({
      limit: fetchLimit
    });
  }, []);

  const sources = stateFeed.length
    ? stateFeed.map(it =>
        (it.public_urls || []).find(
          u => u && u.match(/original.jpg$|video.mp4$/)
        )
      )
    : [];

  return (
    <>
      <div className="page-grams">
        <div
          id="grams-scroll-cont"
          className="scroll-container"
          style={{ height: '100%', width: '100%', overflow: 'scroll' }}
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
                stateFeed.map((data, idx) => (
                  <GramCard
                    {...data}
                    key={idx}
                    onClick={() => setLighboxIdx(idx + 1)}
                  />
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <Lightbox
        index={lighboxIdx}
        sources={sources}
        close={() => setLighboxIdx(0)}
        setIndex={n => setLighboxIdx(n)}
      />
    </>
  );
};

export default Grams;
