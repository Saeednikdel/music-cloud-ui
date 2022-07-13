import { Add, Edit, PlaylistPlay, Remove } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import BtnPrimary from '../components/BtnPrimary';
import EditPlaylist from '../components/forms/EditPlaylist';
import InfiniteScroll from 'react-infinite-scroll-component';
import OutsideClickHandler from 'react-outside-click-handler';
import Popup from '../components/Popup';
import axios from 'axios';
import { connect } from 'react-redux';
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
  const [selectedId, setSelectedId] = useState();
  const [childComponent, setchildComponent] = useState('');
  const handleDialog = (name, id, title) => {
    setchildComponent(name);
    setOpenPopup(true);
    id && setSelectedId(id);
    if (name === 'New') {
      setTitle('');
    } else {
      setTitle(title);
    }
  };
  function ChildrenComponent({ value }) {
    switch (value) {
      case 'New':
      case 'Edit':
        return <EditPlaylist title_old={title} new_playlist={new_playlist} />;
      case 'Delete':
        return (
          <div className=" space-y-8">
            <div>Do you want to delete {title}?</div>
            <BtnPrimary onClick={() => remove_playlist()}>Delete</BtnPrimary>
          </div>
        );
      default:
        return false;
    }
  }
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
        onClick={() => handleDialog('New')}
        className="flex py-2 px-6 text-xl font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
        <Add fontSize="large" />
        <h2>Create New PlayList</h2>
      </div>
      {user_playlists && (
        <InfiniteScroll
          dataLength={user_playlists.length}
          next={fetchData}
          hasMore={playlists_count > user_playlists.length}
          loader={<div></div>}
          endMessage={<div></div>}>
          {user_playlists.map((item, i) => (
            <div
              key={i}
              className="flex items-center py-2 px-6 text-xl font-semibold space-x-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
              <PlaylistPlay fontSize="large" />
              <Link to={`/playlist/${item.id}`} className="flex-1">
                {item.title + '  (' + item.count + '-track)'}
              </Link>
              <Edit
                onClick={() => handleDialog('Edit', item.id, item.title)}
                style={{ fontSize: 25 }}
              />
              <Remove
                onClick={() => handleDialog('Delete', item.id, item.title)}
                fontSize="large"
              />
            </div>
          ))}
        </InfiniteScroll>
      )}
      <OutsideClickHandler
        disabled={!openPopup}
        onOutsideClick={() => setOpenPopup(!openPopup)}>
        <Popup
          title={childComponent}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <ChildrenComponent value={childComponent} />
        </Popup>
      </OutsideClickHandler>
    </div>
  );
  async function new_playlist(newTitle) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };
    if (childComponent === 'New') {
      const body = JSON.stringify({ user: user.id, title: newTitle });
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
    if (childComponent === 'Edit') {
      const body = JSON.stringify({
        user: user.id,
        id: selectedId,
        title: newTitle,
      });
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/cloud/editplaylist/`,
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
  }
  async function remove_playlist() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };
    const body = JSON.stringify({ user: user.id, id: selectedId });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cloud/removeplaylist/`,
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
