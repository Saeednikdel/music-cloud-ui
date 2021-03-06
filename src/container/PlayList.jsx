import React, { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import SongCard from '../components/SongCard';
import { connect } from 'react-redux';
import { load_playlist } from '../actions/cloud';
import { useParams } from 'react-router-dom';

const PlayList = ({
  playlist,
  load_playlist,
  playlist_count,
  skip,
  openMenu,
}) => {
  const { id } = useParams();
  const [page, setPage] = useState(2);
  useEffect(() => {
    load_playlist(id, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    await load_playlist(id, page);
    setPage(page + 1);
  };

  return (
    <>
      {playlist && (
        <InfiniteScroll
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 pb-28 h-screen"
          dataLength={playlist.length}
          next={fetchData}
          hasMore={playlist_count > playlist.length}
          loader={<div></div>}
          endMessage={<div></div>}>
          {playlist.map((post, i) => (
            <SongCard
              key={i}
              post={post}
              skip={skip}
              index={i}
              source="playlist"
              page={page}
              playlistid={id}
              openMenu={openMenu}
            />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  playlist: state.cloud.playlist,
  playlist_count: state.cloud.playlist_count,
});
export default connect(mapStateToProps, {
  load_playlist,
})(PlayList);
