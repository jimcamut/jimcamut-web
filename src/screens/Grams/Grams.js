import React, { useState, useEffect } from 'react';
import './style.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import api from '../../api/api';
import _ from 'lodash';
import Loader from '../../components/Loader/Loader';
import GramCard from '../../components/GramCard/GramCard';
import Lightbox from '../../components/Lightbox/Lightbox';
import { setGrams } from '../../redux/actions/grams';
import { connect } from 'react-redux';
import { dataNeedsReset } from '../../utils/utils';

const sorter = (a, b) =>
  new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
const fetchLimit = 16;

const Grams = props => {
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [stateFeed, setStateFeed] = useState(
    (props.grams.data || []).sort(sorter)
  );
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
    api.grams
      .fetchGrams(opts)
      .then(feed => {
        let newData;
        if (feed.length) {
          if (opts.reset) {
            newData = _.uniqBy(feed, 'id').sort(sorter);
          } else {
            newData = _.uniqBy(stateFeed.concat(feed), 'id').sort(sorter);
          }
          props.setGrams(newData.slice(0, fetchLimit), 'id');
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
    const reset = dataNeedsReset(props.grams, 1);
    getGramsFeed({ limit: fetchLimit, reset });
  }, [props]);

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
              {stateFeed.length > 0 &&
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

export default connect(
  state => ({
    grams: state.grams || {}
  }),
  dispatch => ({
    setGrams: data => dispatch(setGrams(data))
  })
)(Grams);
