import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { load_follower, load_following, load_likes } from '../actions/cloud';

import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';

const List = ({
  likes,
  follower,
  following,
  load_likes,
  like_count,
  follower_count,
  following_count,
  load_follower,
  load_following,
}) => {
  const [page, setPage] = useState(2);
  let { type } = useParams();
  let { id } = useParams();

  useEffect(() => {
    if (type === 'like') {
      load_likes(id, 1);
    }
    if (type === 'follower') {
      load_follower(id, 1);
    }
    if (type === 'following') {
      load_following(id, 1);
    }
    setPage(2);
  }, []);
  const fetchData = async () => {
    if (type === 'like') {
      await load_likes(id, page);
    }
    if (type === 'follower') {
      await load_follower(id, page);
    }
    if (type === 'following') {
      await load_following(id, page);
    }
    setPage(page + 1);
  };
  function Component({ list, count }) {
    return (
      <InfiniteScroll
        dataLength={list.length}
        next={fetchData}
        hasMore={count > list.length}
        loader={<div></div>}
        endMessage={<div></div>}>
        {list.map((item) => (
          <>
            <Link to={`/u/${item.name}/`}>
              <div className="flex items-center p-2 border-b border-gray-300 dark:border-gray-700">
                <div className="h-14 w-14 rounded-full border-2 relative border-gray-300 dark:border-gray-700 overflow-hidden bg-green-600">
                  {item.image ? (
                    <img
                      alt="avatar"
                      className="h-14 w-14 object-cover "
                      src={item.image}
                    />
                  ) : (
                    <h1 className=" text-lg text-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                      {item.name.slice(0, 2).toUpperCase()}
                    </h1>
                  )}
                </div>
                <h1 className=" mx-2">@{item.name}</h1>
                {item.is_verified && (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                    className="w-4 h-4"
                  />
                )}
              </div>
            </Link>
          </>
        ))}
      </InfiniteScroll>
    );
  }
  switch (type) {
    case 'like':
      return <>{likes && <Component list={likes} count={like_count} />}</>;
    case 'follower':
      return (
        <>{likes && <Component list={follower} count={follower_count} />}</>
      );
    case 'following':
      return (
        <>{likes && <Component list={following} count={following_count} />}</>
      );
    default:
      return <h1>Not found!</h1>;
  }
};

const mapStateToProps = (state) => ({
  likes: state.cloud.likes,
  like_count: state.cloud.like_count,
  follower: state.cloud.follower,
  follower_count: state.cloud.follower_count,
  following: state.cloud.following,
  following_count: state.cloud.following_count,
});
export default connect(mapStateToProps, {
  load_likes,
  load_follower,
  load_following,
})(List);
