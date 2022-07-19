import {
  Add,
  Download,
  Edit,
  LibraryMusic,
  Report,
  Share,
} from '@mui/icons-material';
import translate from '../translate';

import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

const MoreMenu = ({
  showMore,
  currentSong,
  index,
  user,
  openMenu,
  setShowMore,
}) => {
  const direction = localStorage.getItem('direction')
    ? localStorage.getItem('direction')
    : 'ltr';
  const handleAddtoplaylist = () => {
    openMenu('player', currentSong.id, currentSong.user_name);
    setShowMore(false);
  };
  return (
    <div
      dir={direction}
      className={`${
        showMore ? 'block' : 'hidden'
      } absolute bg-white dark:bg-slate-900 border bottom-8 right-0 border-gray-300 dark:border-gray-600 mb-2 p-2 rounded-lg z-10 shadow-lg w-72 space-y-1 translate-x-64`}>
      <div
        onClick={() =>
          navigator.share({
            title: 'Music Cloud',
            text: 'Music Cloud',
            url: `${process.env.REACT_APP_API_URL}/p/${index}`,
          })
        }
        className="flex px-2 py-1 items-center hover:cursor-pointer active:text-blue-600">
        <Share />
        <h1 className="text-xl mx-2">{translate('Share')}</h1>
      </div>
      {/* <Link to={`/createcard/${index}/`}>
        <div className="flex px-2 py-1 items-center hover:cursor-pointer active:text-blue-600">
          <LibraryMusic />
          <h1 className="text-xl">Lyrics card</h1>
        </div>
      </Link> */}
      {user && user.name && user.name === currentSong.user_name && (
        <Link to={`/edit/${index}/`}>
          <div className="flex px-2 py-1 items-center hover:cursor-pointer active:text-blue-600">
            <Edit />
            <h1 className="text-xl mx-2">{translate('Edit track')}</h1>
          </div>
        </Link>
      )}

      <a href={currentSong.url} download={currentSong.title + '[Music Cloud]'}>
        <div className="flex px-2 py-1 items-center hover:cursor-pointer active:text-blue-600">
          <Download />
          <h1 className="text-xl mx-2">{translate('Download')}</h1>
        </div>
      </a>
      {user && (
        <div
          onClick={handleAddtoplaylist}
          className="flex px-2 py-1 items-center hover:cursor-pointer active:text-blue-600">
          <Add />
          <h1 className="text-xl mx-2">{translate('Add to playlist')}</h1>
        </div>
      )}
      <div className="flex px-2 py-1 items-center hover:cursor-pointer active:text-blue-600">
        <Report />
        <h1 className="text-xl mx-2">{translate('Report')}</h1>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(MoreMenu);
