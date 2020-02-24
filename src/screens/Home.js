import React, { useState, useEffect } from "react";
import { fetchFeed } from "../api/api";
import { connect } from "react-redux";
import { updateFeed } from "../redux/actions/feed";
import FeedItem from "../components/FeedItem/FeedItem";
import Menu from "../components/Menu/Menu";

const Home = props => {
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [stateFeed, setStateFeed] = useState(props.feed.data);

  const getStravaFeed = () => {
    console.log("FETCHING");
    fetchFeed()
      .then(feed => {
        console.log("FEED1", feed);
        props.updateFeed(feed);
      })
      .catch(console.log);
  };

  useEffect(() => {
    console.log("loaded");
    // getStravaFeed();
  }, []);

  console.log("FEED", props.feed.data);

  return (
    <div className="pane">
      <header
        className="App-header"
        style={{ display: "flex", flexDirection: "column", width: "50%" }}
      >
        <h1>New Website in Progress</h1>
        <p style={{ maxWidth: 600, padding: 20 }}>
          It's been 5+ years since I last written or worked on my personal
          website. I've been a busy guy! I'm still a busy guy, but as a web and
          app developer, I really wanted to rebuild my site.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        {props.feed.data.length &&
          props.feed.data.map(it => <FeedItem key={it.id} data={it} />)}
      </div>
    </div>
  );
};
export default connect(
  state => ({
    feed: state.feed || {}
  }),
  dispatch => ({
    updateFeed: data => dispatch(updateFeed(data))
  })
)(Home);
