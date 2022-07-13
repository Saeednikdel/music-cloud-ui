import { PlaylistPlay } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { load_user_playlists } from '../actions/cloud';

const PlayListAddDialog = ({
  playlists_count,
  user_playlists,
  load_user_playlists,
  user,
  menuItem,
  setOpenPopup,
  setAddToPlayListPopUp,
}) => {
  const [page, setPage] = useState(2);
  useEffect(() => {
    load_user_playlists(user.name, 1);
  }, []);
  const fetchData = async () => {
    await load_user_playlists(user.name, page);
    setPage(page + 1);
  };
  const add = (playlis_id) => {
    add_to_playlist(menuItem.id, playlis_id);
  };
  return (
    <div className=" max-h-96 overflow-auto">
      {user_playlists && (
        <InfiniteScroll
          dataLength={user_playlists.length}
          next={fetchData}
          hasMore={playlists_count > user_playlists.length}
          loader={<div className="text-center"></div>}
          endMessage={<div className="text-center"></div>}>
          {user_playlists.map((item, i) => (
            <div
              key={i}
              className="flex py-2 text-xl font-semibold space-x-4 hover:cursor-pointer dark:text-gray-200 text-gray-900">
              <PlaylistPlay onClick={() => add(item.id)} fontSize="large" />
              <h2 onClick={() => add(item.id)}>{item.title}</h2>
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
  async function add_to_playlist(post, id) {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json',
        },
      };
      const user = localStorage.getItem('id');
      const body = JSON.stringify({ user, post, id });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/cloud/addtoplaylist/`,
          body,
          config
        );
        setOpenPopup(false);
        setAddToPlayListPopUp(false);
      } catch (err) {}
    }
  }
};

const mapStateToProps = (state) => ({
  user_playlists: state.cloud.user_playlists,
  playlists_count: state.cloud.playlists_count,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  load_user_playlists,
})(PlayListAddDialog);
