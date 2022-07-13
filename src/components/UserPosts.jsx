import React, { useEffect, useState } from 'react';

import CircularProgress from '../components/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import SongCard from '../components/SongCard';
import { connect } from 'react-redux';
import { load_user_posts } from '../actions/cloud';

const UserPosts = ({
  userName,
  userposts,
  load_user_posts,
  count,
  skip,
  openMenu,
}) => {
  const [page, setPage] = useState(2);

  useEffect(() => {
    load_user_posts(userName, 1);
    setPage(2);
  }, [userName]);

  const fetchData = async () => {
    await load_user_posts(userName, page);
    setPage(page + 1);
  };

  return (
    <>
      {userposts && (
        <InfiniteScroll
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pb-28"
          dataLength={userposts.length}
          next={fetchData}
          hasMore={count > userposts.length}
          loader={
            <div className="text-center">
              <CircularProgress color="secondary" />
            </div>
          }
          endMessage={
            <div className="text-center">
              <p>...</p>
            </div>
          }>
          {userposts.map((post, i) => (
            <SongCard
              key={i}
              post={post}
              skip={skip}
              index={i}
              source="userpostlist"
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
  userposts: state.cloud.userposts,
  count: state.cloud.profile_count,
});
export default connect(mapStateToProps, {
  load_user_posts,
})(UserPosts);
