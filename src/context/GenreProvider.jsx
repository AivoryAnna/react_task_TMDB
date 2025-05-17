import { useState } from "react";
import { GenreContext } from "./GenreContext";

export const GenreProvider = ({ children }) => {
  const [selectedGenres, setSelectedGenres] = useState([]); 
  const [appliedGenres, setAppliedGenres] = useState([]); 

  return (
    <GenreContext.Provider value={{ selectedGenres, setSelectedGenres, appliedGenres, setAppliedGenres }}>
      {children}
    </GenreContext.Provider>
  );
};

