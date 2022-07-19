import React, { useEffect } from 'react';
import GenreCard from './GenreCard';
import { load_genre } from '../actions/cloud';
import { connect } from 'react-redux';

const GenreSection = ({ genre, load_genre }) => {
  useEffect(() => {
    load_genre();
  }, []);
  return (
    <div className="overflow-auto whitespace-nowrap p-4">
      {genre && genre.map((item, i) => <GenreCard key={i} item={item} />)}
    </div>
  );
};
const mapStateToProps = (state) => ({
  genre: state.cloud.genre,
});
export default connect(mapStateToProps, {
  load_genre,
})(GenreSection);
