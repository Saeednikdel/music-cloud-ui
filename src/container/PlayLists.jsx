import React, { useState, useEffect } from 'react';
import { Add, PlaylistPlay } from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '../components/CircularProgress';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '../components/TextField';
import BtnPrimary from '../components/BtnPrimary';
import OutsideClickHandler from 'react-outside-click-handler';
import Popup from '../components/Popup';
import { connect } from 'react-redux';
import axios from 'axios';
import { load_user_playlists } from '../actions/cloud';

const PlayLists = ({
  isAuthenticated,
  user,
  playlists_count,
  user_playlists,
  load_user_playlists,
}) => {
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [page, setPage] = useState(2);
  const [title, setTitle] = useState('');
  useEffect(() => {
    user.name && load_user_playlists(user.name, 1);
  }, [user]);
  const fetchData = async () => {
    await load_user_playlists(page);
    setPage(user.name, page + 1);
  };
  if (!isAuthenticated) navigate('/login');

  return (
    <div className="mb-24 mt-4">
      <div
        onClick={() => setOpenPopup(true)}
        className="flex py-2 px-6 text-xl font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
        <Add fontSize="large" />
        <h2>Create New PlayList</h2>
      </div>
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
      <OutsideClickHandler
        disabled={!openPopup}
        onOutsideClick={() => setOpenPopup(!openPopup)}>
        <Popup
          title="New playlist"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <div className=" space-y-8">
            <div>
              <TextField
                label="title"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <BtnPrimary onClick={() => new_playlist()}>Create</BtnPrimary>
          </div>
        </Popup>
      </OutsideClickHandler>
    </div>
  );
  async function new_playlist() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };
    const body = JSON.stringify({ user: user.id, title: title });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cloud/newplaylist/`,
        body,
        config
      );
      res.data.id && setOpenPopup(false);
      res.data.id && load_user_playlists(user.name, 1);
      setTitle('');
    } catch (err) {
      console.log(err);
    }
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  user_playlists: state.cloud.user_playlists,
  playlists_count: state.cloud.playlists_count,
});
export default connect(mapStateToProps, { load_user_playlists })(PlayLists);
