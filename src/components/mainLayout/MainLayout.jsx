import React, { useContext, useState, useRef, useEffect } from 'react';
import MovieList from '../movieList/MovieList';
import './MainLayout.css';
import Sidebar from '../sidebar/Sidebar';
import useMovies from '../../hooks/useMovies';
import { GenreContext } from '../../context/GenreContext';
import Button from '../../UI/button/Button';
import useVisibilityObserver from '../../hooks/useVisibilityObserver';

const MainLayout = () => {
  const { appliedGenres } = useContext(GenreContext);
  const { movies, loadMore, hasMore, loading } = useMovies(appliedGenres);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);
  const [loadMoreRef, isLoadMoreVisible] = useVisibilityObserver(null, { threshold: 0.1 });
  const [applied, setApplied] = useState(false);
  const topRef = useRef(null);


  useEffect(() => {
    if (applied && topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [applied]);

  return (
    <div className="movie-page-layout">

      <aside className="sidebar">
        <Sidebar isLoadMoreVisible={isLoadMoreVisible} applied={applied} setApplied={setApplied}/>
      </aside>

      <main className="movies" ref={topRef}>
        <MovieList movies={movies} loadMore={loadMore} hasMore={hasMore} infiniteScrollEnabled={infiniteScrollEnabled} />

        {!loading && hasMore && movies.length >= 18 && (
          <div className='load-more' ref={loadMoreRef}>
            <Button  onClick={() => { loadMore(); setInfiniteScrollEnabled(true); }} variant="active"  className="load-more-button">
              Load More
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainLayout;
