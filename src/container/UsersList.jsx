import React, { useState, useEffect } from 'react';
import TextField from '../components/TextField';
import { connect } from 'react-redux';
import { load_users } from '../actions/cloud';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useNavigate } from 'react-router-dom';

const UsersList = ({ users, load_users, count }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(2);
  const [search, setSearch] = useState(getQueryVariable('search'));
  useEffect(() => {
    load_users(1, getQueryVariable('search'));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    navigate(`/users/?search=${search}`);
    load_users(1, search);
    setPage(2);
  };
  const fetchData = async () => {
    await load_users(page, search);
    setPage(page + 1);
  };
  return (
    <div>
      <div className="p-2">
        <form autoComplete="off" onSubmit={(e) => submit(e)}>
          <TextField
            autoComplete="off"
            id="search"
            placeholder="search"
            value={search ? search : ''}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      {users && (
        <InfiniteScroll
          dataLength={users.length}
          next={fetchData}
          hasMore={count > users.length}
          loader={<div></div>}
          endMessage={
            <div>
              <p>...</p>
            </div>
          }>
          {users.map((item) => (
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
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
  function getQueryVariable(variable) {
    var query = decodeURI(window.location.search.substring(1)).replace(
      /\+/g,
      ' '
    );
    //console.log(query); //"app=article&act=news_content&aid=160990"
    var vars = query.split('&');
    //console.log(vars); //[ 'app=article', 'act=news_content', 'aid=160990' ]
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      //console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }
};

const mapStateToProps = (state) => ({
  users: state.cloud.users,
  count: state.cloud.users_count,
});
export default connect(mapStateToProps, {
  load_users,
})(UsersList);
