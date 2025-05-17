import React, { useContext, useEffect, useState } from "react";
import { fetchGenres } from "../../services/api";
import { GenreContext } from "../../context/GenreContext";
import Button from "../../UI/button/Button";
import "./Sidebar.css";
import clsx from 'clsx';
import useVisibilityObserver from "../../hooks/useVisibilityObserver";

const Sidebar = ({ isLoadMoreVisible, applied, setApplied }) => {
  const [genres, setGenres] = useState([]);
  const [click, setIsClick] = useState(false);
  const { selectedGenres, setSelectedGenres, setAppliedGenres } = useContext(GenreContext);
  const [buttonRef, isButtonVisible] = useVisibilityObserver(null, { threshold: 1 });


  // useEffect runs once, because the dependency array is empty - the thing I blanked on during the interview

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
    setIsClick(true);
    setApplied(false);
  };

  const applyFilters = () => {
    setAppliedGenres([...selectedGenres]);
    setApplied(true);
    setIsClick(false);
  };

  return (
    <div className="filters">
      <h3>Popular Movies</h3>
      <div className="genre-buttons">
        {genres.map((genre) => {
          const selected = selectedGenres.includes(genre.id);
          return (
            <Button key={genre.id} onClick={() => toggleGenre(genre.id)} variant={selected ? "active" : "default"} className='genre-button'>
              {genre.name}
            </Button>
          );
        })}
      </div>

      <Button ref={buttonRef} onClick={applyFilters} variant={selectedGenres.length > 0 || click ? "active" : "primary"} className={clsx('search-button', { ready: selectedGenres.length > 0 || click })}>
        Search
      </Button>
      {selectedGenres.length > 0 && !isButtonVisible && !isLoadMoreVisible && !applied && (
        <div className="sticky-search">
          <Button onClick={applyFilters} variant="active" className="sticky-button">
            Search
          </Button>
        </div>
      )}

    </div>
  );
};

export default Sidebar;


