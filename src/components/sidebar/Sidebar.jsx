import React, { useContext, useEffect, useState } from "react";
import { fetchGenres } from "../../services/api";
import { GenreContext } from "../../context/GenreContext";
import Button from "../../UI/button/Button";
import "./Sidebar.css";
import clsx from 'clsx';

const Sidebar = () => {
  const [genres, setGenres] = useState([]);
  const { selectedGenres, setSelectedGenres, setAppliedGenres } = useContext(GenreContext);

// useEffect runs once, because the dependency array is empty - the thing I blanked on during the interview

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const applyFilters = () => {
    setAppliedGenres([...selectedGenres]);
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
      
      <Button onClick={applyFilters} variant={selectedGenres.length > 0 ? "active" : "primary"} className={clsx('search-button', { 'ready': selectedGenres.length > 0 })}>
        Search
      </Button>
    </div>
  );
};

export default Sidebar;


