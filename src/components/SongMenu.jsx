import {
  Add,
  Delete,
  Edit,
  LibraryMusic,
  Report,
  Share,
  Remove,
  Download,
} from '@mui/icons-material';

import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { remove_post, remove_from_playlist } from '../actions/cloud';

const SongMenu = ({
  user,
  menuItem,
  setOpenPopup,
  remove_post,
  setAddToPlayListPopUp,
  playlist_owner,
  remove_from_playlist,
}) => {
  const click = () => {
    setOpenPopup(false);
  };
  const share = () => {
    navigator.share({
      title: 'Music Cloud',
      text: 'Music Cloud',
      url: `${process.env.REACT_APP_API_URL}/p/${menuItem.id}`,
    });
    setOpenPopup(false);
  };
  const deletePost = () => {
    remove_post(menuItem.source, menuItem.id);
    setOpenPopup(false);
  };
  const handleAdd = () => {
    setAddToPlayListPopUp(true);
  };
  const remove = () => {
    remove_from_playlist(menuItem.id, menuItem.playlistid);
    setOpenPopup(false);
  };
  return (
    <div className=" space-y-1 text-gray-900 dark:text-gray-100">
      <div
        onClick={share}
        className="flex py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
        <Share />
        <h1 className="text-xl">Share</h1>
      </div>
      <Link onClick={click} to={`/createcard/${menuItem.id}/`}>
        <div className="flex py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
          <LibraryMusic />
          <h1 className="text-xl">Lyrics card</h1>
        </div>
      </Link>
      <a href={menuItem.url} download>
        <div className="flex py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
          <Download />
          <h1 className="text-xl">Download</h1>
        </div>
      </a>
      {user && user.name && user.name === menuItem.user_name && (
        <Link onClick={click} to={`/edit/${menuItem.id}/`}>
          <div className="flex py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
            <Edit />
            <h1 className="text-xl">Edit track</h1>
          </div>
        </Link>
      )}
      {user && user.name && user.name === menuItem.user_name && (
        <div onClick={deletePost}>
          <div className="flex py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
            <Delete />
            <h1 className="text-xl">Delete track</h1>
          </div>
        </div>
      )}
      {user && (
        <div
          onClick={handleAdd}
          className="flex py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
          <Add />
          <h1 className="text-xl">Add to playlist</h1>
        </div>
      )}
      {menuItem.source === 'playlist' && user && playlist_owner === user.id && (
        <div
          onClick={remove}
          className="flex py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
          <Remove />
          <h1 className="text-xl">Remove from playlist</h1>
        </div>
      )}
      <div
        onClick={click}
        className="flex py-1 space-x-2 items-center hover:cursor-pointer active:text-blue-600">
        <Report />
        <h1 className="text-xl">Report</h1>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  playlist_owner: state.cloud.playlist_owner,
});
export default connect(mapStateToProps, { remove_post, remove_from_playlist })(
  SongMenu
);
