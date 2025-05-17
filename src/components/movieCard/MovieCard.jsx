import React from 'react';
import './MovieCard.css';
import RatingCircle from '../ratingCircle/RatingCircle';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {

  // Object destructuring - the thing I blanked on during the interview
  const { title, poster_path, release_date, vote_average } = movie;

  return (
    <div className="movie-card">
      <img className="poster" src={poster_path ? IMG_BASE_URL + poster_path : '/placeholder.jpg'} alt={title} />

      <div className="rating">
        <RatingCircle value={Math.round(vote_average * 10)} />
      </div>


      <div className="info">
        <h3>{title}</h3>
        <p>{release_date}</p>
      </div>
   
    </div>
  );
};

export default MovieCard;
