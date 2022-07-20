import React from 'react';
import { Favorite, PersonAddRounded, Cached } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import translate from '../translate';

export default function NotifCard({ notif }) {
  return (
    <Link
      to={
        notif.kind === 'followed you'
          ? `/u/${notif.name}/`
          : `/p/${notif.post}/`
      }>
      <div className="flex items-center p-2">
        {notif.kind === 'liked your post' && <Favorite color="error" />}
        {notif.kind === 'followed you' && <PersonAddRounded color="primary" />}
        {notif.kind === 'reposted your post' && <Cached color="success" />}
        <Link to={`/u/${notif.name}/`}>
          <div className="h-14 w-14 mx-2 rounded-full border-2 relative border-gray-300 dark:border-gray-700 overflow-hidden bg-green-600">
            {notif.image ? (
              <img
                alt="avatar"
                className="h-14 w-14 object-cover "
                src={notif.image}
              />
            ) : (
              <h1 className=" text-lg text-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                {notif.name.slice(0, 2).toUpperCase()}
              </h1>
            )}
          </div>
        </Link>
        <div>
          <Link to={`/u/${notif.name}/`}>
            <div className="flex items-center">
              <p className=" mx-1" dir="ltr">
                @{notif.name}
              </p>
              {notif.is_verified && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                  className="w-3 h-3"
                />
              )}
              <p className="mx-1">{translate(notif.kind)}</p>
            </div>
          </Link>
          <p>{notif.date.slice(0, 10)}</p>
        </div>
      </div>
    </Link>
  );
}
