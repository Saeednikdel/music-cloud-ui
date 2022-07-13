import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import SongCard from '../components/SongCard';
import { connect } from 'react-redux';
import { load_user_favorites } from '../actions/cloud';

const UserFavorite = ({
  userfavs,
  load_user_favorites,
  count,
  skip,
  userName,
  openMenu,
}) => {
  const [page, setPage] = useState(2);

  useEffect(() => {
    load_user_favorites(userName, 1);
    setPage(2);
  }, []);

  const fetchData = async () => {
    await load_user_favorites(userName, page);
    setPage(page + 1);
  };

  return (
    <>
      {userfavs && (
        <InfiniteScroll
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pb-28"
          dataLength={userfavs.length}
          next={fetchData}
          hasMore={count > userfavs.length}
          loader={<div className="text-center"></div>}
          endMessage={<div className="text-center"></div>}>
          {userfavs.map((post, i) => (
            <SongCard
              key={i}
              post={post}
              skip={skip}
              index={i}
              source="userfavorites"
              page={page}
              userName={userName}
              openMenu={openMenu}
            />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userfavs: state.cloud.userfavs,
  count: state.cloud.fav_count,
});
export default connect(mapStateToProps, {
  load_user_favorites,
})(UserFavorite);
