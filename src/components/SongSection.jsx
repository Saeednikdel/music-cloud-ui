import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import SongCard from './SongCard';
import { connect } from 'react-redux';
import { load_posts } from '../actions/cloud';

const SongSection = ({ posts, load_posts, count, skip, openMenu }) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    load_posts(1, false);
    setPage(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    await load_posts(page, false);
    setPage(page + 1);
  };

  return (
    <>
      {posts && (
        <InfiniteScroll
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pb-28 h-screen"
          dataLength={posts.length}
          next={fetchData}
          hasMore={count > posts.length}
          loader={<div></div>}
          endMessage={<div></div>}>
          {posts.map((post, i) => (
            <SongCard
              key={i}
              post={post}
              skip={skip}
              index={i}
              source="home"
              page={page}
              openMenu={openMenu}
            />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.cloud.posts,
  count: state.cloud.count,
});
export default connect(mapStateToProps, {
  load_posts,
})(SongSection);
