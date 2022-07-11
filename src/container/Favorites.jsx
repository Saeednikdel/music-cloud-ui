import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { load_user_favorites } from '../actions/cloud';
import SongCard from '../components/SongCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '../components/CircularProgress';
import { useNavigate } from 'react-router-dom';

const Favorite = ({
  userfavs,
  load_user_favorites,
  count,
  skip,
  isAuthenticated,
}) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(2);

  useEffect(() => {
    load_user_favorites(1);
    setPage(2);
  }, []);

  const fetchData = async () => {
    await load_user_favorites(page);
    setPage(page + 1);
  };
  if (!isAuthenticated) navigate('/login');

  return (
    <>
      {userfavs && (
        <InfiniteScroll
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pb-28"
          dataLength={userfavs.length}
          next={fetchData}
          hasMore={count > userfavs.length}
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
          {userfavs.map((post, i) => (
            <SongCard
              key={i}
              post={post}
              skip={skip}
              index={i}
              source="userfavorites"
              page={page}
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
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  load_user_favorites,
})(Favorite);
