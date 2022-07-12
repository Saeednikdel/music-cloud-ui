import React, { useState, useEffect } from 'react';
import { PlaylistPlay } from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '../components/CircularProgress';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { load_user_playlists } from '../actions/cloud';

const UserPlayLists = ({
  userName,
  playlists_count,
  user_playlists,
  load_user_playlists,
}) => {
  const [page, setPage] = useState(2);
  useEffect(() => {
    load_user_playlists(userName, 1);
  }, []);
  const fetchData = async () => {
    await load_user_playlists(page);
    setPage(userName, page + 1);
  };

  return (
    <div className="mb-24 mt-4">
      {user_playlists && (
        <InfiniteScroll
          dataLength={user_playlists.length}
          next={fetchData}
          hasMore={playlists_count > user_playlists.length}
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
          {user_playlists.map((item, i) => (
            <Link
              to={`/playlist/${item.id}`}
              key={i}
              className="flex py-2 px-6 text-xl font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
              <PlaylistPlay fontSize="large" />
              <h2>{item.title + '  (' + item.count + '-track)'}</h2>
            </Link>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_playlists: state.cloud.user_playlists,
  playlists_count: state.cloud.playlists_count,
});
export default connect(mapStateToProps, { load_user_playlists })(UserPlayLists);
