import React from 'react';
import { Link } from 'react-router-dom';

const UserSectionCard = ({ item }) => {
  return (
    <div className="p-3 flex flex-col items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 space-y-3 bg-white dark:bg-slate-900">
      <Link to={`/u/${item.name}`}>
        <div className="h-16 w-16 rounded-full border-2 relative border-gray-300 dark:border-gray-700 overflow-hidden bg-green-600">
          {item.image ? (
            <img
              alt="avatar"
              className="h-16 w-16 object-cover "
              src={item.image}
            />
          ) : (
            <h1 className=" text-lg text-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              {item.name.slice(0, 2).toUpperCase()}
            </h1>
          )}
        </div>
      </Link>
      <h1>
        @{item.name.length < 6 ? item.name : item.name.slice(0, 6) + '...'}
      </h1>
      <Link
        to={`/u/${item.name}`}
        className="bg-blue-600 py-1 px-2 rounded-full text-sm text-white whitespace-nowrap">
        view profile
      </Link>
    </div>
  );
};

export default UserSectionCard;
