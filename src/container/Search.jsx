import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import SongCard from '../components/SongCard';
import { connect } from 'react-redux';
import { load_posts } from '../actions/cloud';
import TextField from '../components/TextField';
import { Link, useNavigate } from 'react-router-dom';

const Search = ({ posts, load_posts, count, skip, openMenu }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const key = getQueryVariable('keyword');
  const [search, setSearch] = useState(key);
  useEffect(() => {
    key && load_posts(1, key);
    key && setPage(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submit = (e) => {
    e.preventDefault();
    navigate(`/search/?keyword=${search}`);
    load_posts(1, search);
    setPage(2);
  };
  const fetchData = async () => {
    await load_posts(page, search);
    setPage(page + 1);
  };

  return (
    <>
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
      {posts && (
        <InfiniteScroll
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pb-28 h-screen"
          dataLength={posts.length}
          next={fetchData}
          hasMore={count > posts.length}
          loader={<div></div>}
          endMessage={<div></div>}>
          {posts.map((post, i) => (
            <SongCard
              key={i}
              post={post}
              skip={skip}
              index={i}
              source="search"
              page={page}
              openMenu={openMenu}
            />
          ))}
        </InfiniteScroll>
      )}
    </>
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
  posts: state.cloud.posts,
  count: state.cloud.count,
});
export default connect(mapStateToProps, {
  load_posts,
})(Search);
