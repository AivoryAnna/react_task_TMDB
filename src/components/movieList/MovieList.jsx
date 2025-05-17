import React from 'react';
import MovieCard from '../movieCard/MovieCard';
import './MovieList.css';
import useVisibilityObserver from '../../hooks/useVisibilityObserver';

const MovieList = ({ movies, loadMore, hasMore, infiniteScrollEnabled }) => {

  const [observerRef] = useVisibilityObserver(() => {
    if (hasMore) {
      loadMore();
    }
  }, { enabled: infiniteScrollEnabled && hasMore, threshold: 0.2 });
  

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {hasMore && infiniteScrollEnabled && <div ref={observerRef} style={{ height: 20 }} />}
    </div>
  );
};

export default MovieList;

