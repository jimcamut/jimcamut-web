import React, { memo } from "react";

const FeedItem = props => {
  const { id } = props.data || {};
  return (
    <div className="feedItem" style={{ width: "100%", backgroundColor: "red" }}>
      <p>{id}</p>
    </div>
  );
};

export default memo(FeedItem);
