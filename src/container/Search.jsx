import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import SongCard from '../components/SongCard';
import { connect } from 'react-redux';
import { load_posts, load_genre } from '../actions/cloud';
import TextField from '../components/TextField';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Popup from '../components/Popup';
import BtnPrimary from '../components/BtnPrimary';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  SearchSharp,
  ArrowBack,
  ArrowForward,
  Person,
  MusicNote,
  FilterList,
} from '@mui/icons-material';
import translate from '../translate';
const Search = ({
  posts,
  load_posts,
  count,
  skip,
  openMenu,
  load_genre,
  genre,
}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const key = getQueryVariable('keyword');
  const gen = getQueryVariable('genre');
  const [search, setSearch] = useState(key);
  const [selectedGenre, setSelectedGenre] = useState(gen);
  const [openPopup, setOpenPopup] = useState(false);
  const location = useLocation().pathname.split('/')[1];
  console.log(location);
  useEffect(() => {
    load_posts(1, key, gen);
    setPage(2);
    load_genre();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submit = (e) => {
    e.preventDefault();
    openPopup && setOpenPopup(false);
    if (search && selectedGenre) {
      navigate(`/search/?keyword=${search}&genre=${selectedGenre}`);
    } else if (search) {
      navigate(`/search/?keyword=${search}`);
    } else if (selectedGenre) {
      navigate(`/search/?genre=${selectedGenre}`);
    } else {
      navigate('/search');
    }
    load_posts(1, search, selectedGenre);
    setPage(2);
  };
  const fetchData = async () => {
    await load_posts(page, search, selectedGenre);
    setPage(page + 1);
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900">
        <div className="p-3 flex items-center">
          <Link to="/" className="hover:cursor-pointer">
            <div className="block rtl:hidden">
              <ArrowBack />
            </div>
            <div className="hidden rtl:block">
              <ArrowForward />
            </div>
          </Link>
          <form
            className="flex-1 flex items-center mx-2"
            autoComplete="off"
            onSubmit={(e) => submit(e)}>
            <TextField
              autoComplete="off"
              id="search"
              placeholder={translate('search')}
              value={search ? search : ''}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="-ml-8 rtl:-mr-8 hover:cursor-pointer">
              <SearchSharp />
            </button>
          </form>
          <BtnPrimary onClick={() => setOpenPopup(!openPopup)}>
            <FilterList />
          </BtnPrimary>
        </div>
        <div className="flex items-center border-t border-gray-300 dark:border-gray-500">
          <Link
            to="/search"
            className={`${
              location === 'search' && 'border-b-2 border-blue-600'
            } p-3 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 flex-1 text-center`}>
            <MusicNote color={location === 'search' ? 'primary' : 'inherit'} />
          </Link>

          <Link
            to="/users"
            className={`${
              location === 'users' && 'border-b-2 border-blue-600'
            } p-3 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 flex-1  text-center`}>
            <Person color={location === 'users' ? 'primary' : 'inherit'} />
          </Link>
        </div>
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
      <OutsideClickHandler
        disabled={!openPopup}
        onOutsideClick={() => setOpenPopup(!openPopup)}>
        <Popup
          title={translate('filter')}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}>
          <div className="flex flex-col items-center">
            <label for="genre" class="block mb-2 text-sm font-medium">
              {translate('genre')}
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              id="genre"
              name="genre"
              class="bg-gray-100 dark:bg-slate-800 border mb-3 border-gray-300  text-sm rounded block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 ">
              <option value="" selected>
                {translate('none')}
              </option>
              {genre &&
                genre.map((item) => (
                  <option value={item.id}>{item.title}</option>
                ))}
            </select>
            <BtnPrimary onClick={submit}>{translate('search')}</BtnPrimary>
          </div>
        </Popup>
      </OutsideClickHandler>
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
  genre: state.cloud.genre,
});
export default connect(mapStateToProps, {
  load_posts,
  load_genre,
})(Search);
