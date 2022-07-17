import React from 'react';
import { Favorite, PersonAddRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function NotifCard({ notif }) {
  return (
    <Link
      to={
        notif.kind === 'followed you'
          ? `/u/${notif.name}/`
          : `/p/${notif.post}/`
      }>
      <div className="flex items-center p-2 space-x-2">
        {notif.kind === 'liked your post' && <Favorite color="error" />}
        {notif.kind === 'followed you' && <PersonAddRounded color="primary" />}
        <Link to={`/u/${notif.name}/`}>
          <div className="h-14 w-14 rounded-full border-2 relative border-gray-300 dark:border-gray-700 overflow-hidden bg-green-600">
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
            <div className="flex items-center space-x-1">
              <p>@{notif.name}</p>
              {notif.is_verified && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                  className="w-3 h-3"
                />
              )}
              <p>{notif.kind}</p>
            </div>
          </Link>
          <p>{notif.date.slice(0, 10)}</p>
        </div>
      </div>
    </Link>
  );
}
