import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { load_profile } from '../actions/cloud';
import { follow_unfollw } from '../actions/auth';
import { Link, useParams } from 'react-router-dom';
import BtnPrimary from '../components/BtnPrimary';
import BtnSecondary from '../components/BtnSecondary';
import CircularProgress from '../components/CircularProgress';
import UserPosts from '../components/UserPosts';
import UserPlayLists from '../components/UserPlayLists';
import UserFavorite from '../components/UserFavorite';

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

  return profile && profile.name === userName ? (
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
            <img alt="avatar" className=" object-cover " src={profile.image} />
          ) : (
            <h1 className=" text-4xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
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
                  <img
                    alt="verify"
                    src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                    className="h-4 w-4 mx-4"
                  />
                )}
              </div>
              <h1 className=" text-gray-500 dark:text-gray-400">
                @{profile.name}
              </h1>
              <h1 className=" text-gray-500 dark:text-gray-400">
                joined : {profile && profile.join_date.slice(0, 7)}
              </h1>
            </div>
            <div className="flex flex-1 justify-end">
              {isAuthenticated && user.id !== profile.id && (
                <>
                  <BtnPrimary onClick={() => follow_unfollw(userName)}>
                    {profile.followed === true ? 'unfollow' : 'follow'}
                  </BtnPrimary>
                </>
              )}
              {isAuthenticated && user.id === profile.id && (
                <Link to="/setting">
                  <BtnSecondary>setting</BtnSecondary>
                </Link>
              )}
            </div>
          </div>
          {profile.bio && <h1 className="mt-4">{profile.bio}</h1>}
          <div className=" flex items-center space-x-4">
            <Link to={`/list/follower/${userName}`}>
              <h1>follower : {profile.followers}</h1>
            </Link>
            <Link to={`/list/following/${userName}`}>
              <h1>following : {profile.followings}</h1>
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setTab('tracks')}
            className={`${
              tab === 'tracks' && 'border-b-2 border-blue-600'
            } p-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 flex-1`}>
            tracks
          </button>
          <button
            onClick={() => setTab('playlists')}
            className={`${
              tab === 'playlists' && 'border-b-2 border-blue-600'
            } p-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 flex-1`}>
            playlists
          </button>
          <button
            onClick={() => setTab('favorite')}
            className={`${
              tab === 'favorite' && 'border-b-2 border-blue-600'
            } p-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 flex-1`}>
            favorite
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
  ) : (
    <>
      <CircularProgress />
    </>
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
