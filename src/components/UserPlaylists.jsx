import { Edit, PlaylistPlay } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { load_user_playlists } from '../actions/cloud';
import translate from '../translate';

const UserPlayLists = ({
  userName,
  playlists_count,
  user_playlists,
  load_user_playlists,
  isAuthenticated,
  user,
}) => {
  const [page, setPage] = useState(2);
  useEffect(() => {
    load_user_playlists(userName, 1);
  }, []);
  const fetchData = async () => {
    await load_user_playlists(userName, page);
    setPage(page + 1);
  };

  return (
    <div className="mb-24 mt-4">
      {isAuthenticated && user.name === userName && (
        <Link
          to="/playlists"
          className="flex items-center py-2 px-6 text-lg font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
          <Edit style={{ fontSize: 25 }} />
          <h2>{translate('Edit Playlists')}</h2>
        </Link>
      )}
      {user_playlists && (
        <InfiniteScroll
          dataLength={user_playlists.length}
          next={fetchData}
          hasMore={playlists_count > user_playlists.length}
          loader={<div className="text-center"></div>}
          endMessage={<div className="text-center"></div>}>
          {user_playlists.map((item, i) => (
            <Link
              to={`/playlist/${item.id}`}
              key={i}
              className="flex py-2 px-6 text-lg font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
              <PlaylistPlay fontSize="large" />
              <h2>{item.title + '  (' + item.count + ' - track)'}</h2>
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
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { load_user_playlists })(UserPlayLists);
