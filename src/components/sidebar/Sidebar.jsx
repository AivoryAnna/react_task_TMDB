import React, { useContext, useEffect, useState } from "react";
import { fetchGenres } from "../../services/api";
import { GenreContext } from "../../context/GenreContext";
import Button from "../../UI/button/Button";
import "./Sidebar.css";
import clsx from "clsx";
import useVisibilityObserver from "../../hooks/useVisibilityObserver";

const Sidebar = ({ isLoadMoreVisible, applied, setApplied }) => {
  const [genres, setGenres] = useState([]);
  const [hoveringId, setHoveringId] = useState(null);
  const [justUnselected, setJustUnselected] = useState({});
  const { selectedGenres, setSelectedGenres, setAppliedGenres } = useContext(GenreContext);
  const [buttonRef, isButtonVisible] = useVisibilityObserver(null, { threshold: 1 });

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  const toggleGenre = (id) => {
    const wasSelected = selectedGenres.includes(id);

    setSelectedGenres((prev) =>
      wasSelected ? prev.filter((g) => g !== id) : [...prev, id]
    );

    if (wasSelected) {
      setJustUnselected((prev) => ({ ...prev, [id]: true }));
    }

    setApplied(false);
  };

  useEffect(() => {
    const timers = Object.entries(justUnselected).map(([id]) => {
      return setTimeout(() => {
        setJustUnselected((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      }, 2000);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [Object.keys(justUnselected).join(",")]);

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
            <Button key={genre.id} onMouseEnter={() => setHoveringId(genre.id)} onMouseLeave={() => setHoveringId(null)} onClick={() => toggleGenre(genre.id)} variant={selected ? "active" : "default"} 
            className={clsx("genre-button", justUnselected[genre.id] && "just-unselected", hoveringId === genre.id && "genre-button-hover")}>
              {genre.name}
            </Button>
          );
        })}
      </div>

      <Button ref={buttonRef} onClick={applyFilters} variant={selectedGenres.length > 0 ? "active" : "primary"} className={clsx("search-button", { ready: selectedGenres.length > 0 })}>
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



