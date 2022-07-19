import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';
import { connect } from 'react-redux';
import { load_now_playing } from '../actions/cloud';

const NowPlaying = ({
  index,
  skipToIndex,
  now_playing,
  load_now_playing,
  source,
  setSource,
  now_playing_count,
}) => {
  const fetchData = async () => {
    if (source.source !== 'search') {
      await load_now_playing(
        source.source,
        source.page,
        source.user_name,
        source.playlistid
      );
      setSource({ ...source, page: source.page + 1 });
    }
  };
  return (
    <InfiniteScroll
      className=" mb-24"
      dataLength={now_playing.length}
      next={fetchData}
      hasMore={now_playing_count > now_playing.length}
      loader={<div className="text-center"></div>}
      endMessage={<div className="text-center"></div>}>
      {now_playing.map((item, i) => (
        <div
          id={i}
          key={i}
          onClick={() => skipToIndex(i)}
          className="flex py-2 px-6 font-semibold hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
          <img
            alt={item.title}
            className="w-20 h-20 object-cover rounded-lg"
            src={item.artwork}
          />
          <div className={`${i === index && 'text-blue-600'} mx-4`}>
            <h2>{item.title}</h2>
            <p>{item.artist}</p>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};
const mapStateToProps = (state) => ({
  now_playing: state.cloud.now_playing,
  now_playing_count: state.cloud.now_playing_count,
});
export default connect(mapStateToProps, { load_now_playing })(NowPlaying);
