import React, { useContext, useState } from 'react';
import { GenreContext } from '../../context/GenreContext';
import useMovies from '../../hooks/useMovies';
import MovieCard from '../movieCard/MovieCard';
import './MovieList.css';
import Button from '../../UI/button/Button';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const MovieList = () => {
  const { appliedGenres } = useContext(GenreContext);
  const { movies, loadMore, hasMore, loading } = useMovies(appliedGenres);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);
  const observerRef = useInfiniteScroll({ callback: loadMore, enabled: infiniteScrollEnabled, hasMore });

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {!loading && hasMore && (
        <Button onClick={() => {loadMore(); setInfiniteScrollEnabled(true);}} variant="active" className="load-more-button">
          Load More
        </Button>
      )}

      {hasMore && infiniteScrollEnabled && <div ref={observerRef} style={{ height: 20 }} />}
    </div>
  );
};


export default MovieList;
