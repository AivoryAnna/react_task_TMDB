import React from 'react';
import './MovieCard.css';
import RatingCircle from '../ratingCircle/RatingCircle';

// I’m using the IMG_BASE_URL constant to build the full URL for the movie poster
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {

  // I’m using object destructuring - the thing I blanked on during the interview
  const { title, poster_path, release_date, vote_average } = movie;

  return (
    <div className="movie-card">
      <img className="poster" src={poster_path ? IMG_BASE_URL + poster_path : '/placeholder.jpg'} alt={title} />

      <div className="info">
        <h3>{title}</h3>
        <p>{release_date}</p>
      </div>


      <div className="rating">
        <RatingCircle value={Math.round(vote_average * 10)} />
      </div>

    </div>
  );
};

export default MovieCard;
