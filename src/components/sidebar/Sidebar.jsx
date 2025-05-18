import React, { useContext, useEffect, useState } from "react";
import { fetchGenres } from "../../services/api";
import { GenreContext } from "../../context/GenreContext";
import Button from "../../UI/button/Button";
import "./Sidebar.css";
import clsx from "clsx";
import useVisibilityObserver from "../../hooks/useVisibilityObserver";

const Sidebar = ({ isLoadMoreVisible, applied, setApplied }) => {
  const [genres, setGenres] = useState([]);
  const { selectedGenres, setSelectedGenres, appliedGenres,  setAppliedGenres } = useContext(GenreContext);
  const [buttonRef, isButtonVisible] = useVisibilityObserver(null, { threshold: 1 });
  const genresAreEqual =
  selectedGenres.length === appliedGenres.length &&
  selectedGenres.every((id) => appliedGenres.includes(id));

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  const toggleGenre = (id) => {
    const wasSelected = selectedGenres.includes(id);

    setSelectedGenres((prev) =>
      wasSelected ? prev.filter((g) => g !== id) : [...prev, id]
    );


    setApplied(false);
  };


  const applyFilters = () => {
    setAppliedGenres([...selectedGenres]);
    setApplied(true);
  };

  return (
    <div className="filters">
      <h3>Popular Movies</h3>
      <div className="genre-buttons">
        {genres.map((genre) => {
          ///Incorrect behavior between the selected state and hover on the original site, so I implemented it differently
          const selected = selectedGenres.includes(genre.id);
          return (
            <Button key={genre.id}  onClick={() => toggleGenre(genre.id)} variant={selected ? "active" : "default"} 
            className={clsx(!selected && "genre-button")}
            >
              {genre.name}
            </Button>
          );
        })}
      </div>

      <Button ref={buttonRef}  disabled={genresAreEqual} onClick={applyFilters} variant={ !genresAreEqual ? "active" : "primary"} className={clsx("search-button", { ready: !genresAreEqual })}>
        Search
      </Button>

      {selectedGenres.length > 0 && !genresAreEqual && !isButtonVisible && !isLoadMoreVisible && !applied && (
          <Button onClick={applyFilters} variant="active" className="sticky-button">
            Search
          </Button>
      )}
    </div>
  );
};

export default Sidebar;



