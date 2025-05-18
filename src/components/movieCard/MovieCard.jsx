import React from 'react';
import './MovieCard.css';
import RatingCircle from '../ratingCircle/RatingCircle';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date, vote_average } = movie;
  const rating = Math.round(vote_average * 10);

  return (
    <div className="movie-card">
      {poster_path ?
        (
          <img className="poster" src={IMG_BASE_URL + poster_path} alt={title} />)
        :
        (
          <div className="poster placeholder">No Image</div>
        )}

      <div className="rating">
        <RatingCircle value={rating} />
      </div>

      <div className="info">
        <h3>{title}</h3>
        <p>{formatDate(release_date)}</p>
      </div>
    </div>
  );
};

export default MovieCard;

