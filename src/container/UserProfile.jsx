import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  MusicNote,
  PlaylistPlay,
  Favorite,
  CalendarMonth,
  Verified,
} from '@mui/icons-material';
import BtnPrimary from '../components/BtnPrimary';
import BtnSecondary from '../components/BtnSecondary';
import UserFavorite from '../components/UserFavorite';
import UserPlayLists from '../components/UserPlaylists';
import UserPosts from '../components/UserPosts';
import { connect } from 'react-redux';
import { follow_unfollw } from '../actions/auth';
import { load_profile } from '../actions/cloud';
import translate from '../translate';
const UserProfile = ({
  isAuthenticated,
  load_profile,
  profile,
  follow_unfollw,
  user,
  skip,
  openMenu,
}) => {
  let { userName } = useParams();
  const [tab, setTab] = useState('tracks');
  useEffect(() => {
    load_profile(userName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    profile &&
    profile.name === userName && (
      <>
        <div className="bg-white dark:bg-slate-900">
          <div className="w-full h-32 md:h-40 overflow-hidden bg-blue-600">
            {profile.header && (
              <img
                alt="header"
                className="w-full h-32 md:h-40 object-cover"
                src={profile.header}
              />
            )}
          </div>
          <div className="h-20 w-20 object-cover md:h-28 md:w-28 rounded-full -mt-10 md:-mt-14 mx-10 md:mx-14 border-4 border-gray-300 dark:border-gray-700 relative overflow-hidden bg-green-600">
            {profile.image ? (
              <img
                alt="avatar"
                className="h-20 w-20 md:h-28 md:w-28 object-cover "
                src={profile.image}
              />
            ) : (
              <h1 className=" text-4xl text-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                {profile.name.slice(0, 2).toUpperCase()}
              </h1>
            )}
          </div>

          <div className="p-6 border-b border-gray-300 dark:border-gray-600">
            <div className=" flex items-center">
              <div>
                <div className=" flex items-center">
                  <h1 className=" text-lg font-bold">{profile.profile_name}</h1>
                  {profile.is_verified && (
                    <Verified
                      className="mx-2"
                      fontSize="small"
                      color="primary"
                    />
                  )}
                </div>
                <h1 className=" text-gray-500 dark:text-gray-400">
                  @{profile.name}
                </h1>
                <h1 className=" text-gray-500 dark:text-gray-400">
                  <CalendarMonth fontSize="small" />
                  {'  '} {profile && profile.join_date.slice(0, 7)}
                </h1>
              </div>
              <div className="flex flex-1 justify-end">
                {isAuthenticated && user.id !== profile.id && (
                  <>
                    <BtnPrimary onClick={() => follow_unfollw(userName)}>
                      {profile.followed === true
                        ? translate('unfollow')
                        : translate('follow')}
                    </BtnPrimary>
                  </>
                )}
                {isAuthenticated && user.id === profile.id && (
                  <Link to="/setting">
                    <BtnSecondary>{translate('Setting')}</BtnSecondary>
                  </Link>
                )}
              </div>
            </div>
            {profile.bio && <h1 className="mt-4">{profile.bio}</h1>}
            <div className=" flex items-center">
              <Link className="flex" to={`/list/follower/${userName}`}>
                <h1>{translate('follower')} : </h1>
                <h1>{profile.followers}</h1>
              </Link>
              <Link className="mx-4 flex" to={`/list/following/${userName}`}>
                <h1>{translate('following')} : </h1>
                <h1>{profile.followings}</h1>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setTab('tracks')}
              className={`${
                tab === 'tracks' && 'border-b-2 border-blue-600'
              } p-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 flex-1`}>
              <MusicNote color={tab === 'tracks' ? 'primary' : 'inherit'} />
            </button>
            <button
              onClick={() => setTab('playlists')}
              className={`${
                tab === 'playlists' && 'border-b-2 border-blue-600'
              } p-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 flex-1`}>
              <PlaylistPlay
                color={tab === 'playlists' ? 'primary' : 'inherit'}
              />
            </button>
            <button
              onClick={() => setTab('favorite')}
              className={`${
                tab === 'favorite' && 'border-b-2 border-blue-600'
              } p-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 flex-1`}>
              <Favorite color={tab === 'favorite' ? 'primary' : 'inherit'} />
            </button>
          </div>
        </div>
        {tab === 'tracks' && (
          <UserPosts userName={userName} skip={skip} openMenu={openMenu} />
        )}
        {tab === 'playlists' && <UserPlayLists userName={userName} />}
        {tab === 'favorite' && (
          <UserFavorite userName={userName} skip={skip} openMenu={openMenu} />
        )}
      </>
    )
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  profile: state.cloud.profile,
});
export default connect(mapStateToProps, {
  load_profile,
  follow_unfollw,
})(UserProfile);
