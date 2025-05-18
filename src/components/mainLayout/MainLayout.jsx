import React, { useContext, useState, useRef, useEffect } from 'react';
import MovieList from '../movieList/MovieList';
import './MainLayout.css';
import Sidebar from '../sidebar/Sidebar';
import useMovies from '../../hooks/useMovies';
import { GenreContext } from '../../context/GenreContext';
import useVisibilityObserver from '../../hooks/useVisibilityObserver';

const MainLayout = () => {
  const { appliedGenres } = useContext(GenreContext);
  const { movies, loadMore, hasMore, loading, error } = useMovies(appliedGenres);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);
  const [loadMoreRef, isLoadMoreVisible] = useVisibilityObserver(null, { threshold: 0.1 });
  const [applied, setApplied] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    if (applied) {
      setInfiniteScrollEnabled(false);
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [applied]);

  if (error) {
    return (
      <div className="movie-page">
        <div className="error-movies">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-page-layout">
      <aside className="sidebar">
        <Sidebar isLoadMoreVisible={isLoadMoreVisible} applied={applied} setApplied={setApplied} />
      </aside>

      {movies.length > 0 ? (
        <main className="movies" ref={topRef}>
          <MovieList movies={movies} loadMore={loadMore} hasMore={hasMore} infiniteScrollEnabled={infiniteScrollEnabled} />

          {!loading && hasMore && movies.length >= 18 && (
            <div onClick={() => { loadMore(); setInfiniteScrollEnabled(true); }} className="load-more" ref={loadMoreRef}>
              Load More
            </div>
          )}
        </main>
      ) : (
        <div className="no-movies">
          <p>No movies found</p>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
