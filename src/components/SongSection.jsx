import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';
import { connect } from 'react-redux';
import { load_posts } from '../actions/cloud';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from './CircularProgress';

const SongSection = ({ posts, load_posts, count, history, skip, openMenu }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(getQueryVariable('keyword'));
  useEffect(() => {
    load_posts(1, getQueryVariable('keyword'));
    setPage(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submit = (e) => {
    e.preventDefault();
    const currentUrlParams = new URLSearchParams();
    currentUrlParams.set('keyword', search);
    if (window.location.pathname === '/') {
      history.push(
        window.location.pathname + '?' + currentUrlParams.toString()
      );
    } else {
      window.location.replace('/?keyword=' + search);
    }
    load_posts(1, search);
    setPage(2);
  };
  const fetchData = async () => {
    await load_posts(page, search);
    setPage(page + 1);
  };

  return (
    <>
      {posts && (
        <InfiniteScroll
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pb-28 h-screen"
          dataLength={posts.length}
          next={fetchData}
          hasMore={count > posts.length}
          loader={
            <div>
              <p>loading</p>
            </div>
          }
          endMessage={
            <div>
              <p>...</p>
            </div>
          }>
          {posts.map((post, i) => (
            <SongCard
              key={i}
              post={post}
              skip={skip}
              index={i}
              source="home"
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
})(SongSection);
