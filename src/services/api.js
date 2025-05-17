const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (page = 1, genreIds = []) => {
  const genreParam = Array.isArray(genreIds)
    ? genreIds.slice().sort().join(",")
    : genreIds;

  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=popularity.desc`;

  if (genreParam) {
    url += `&with_genres=${genreParam}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch movies");
  const data = await response.json();
  return data.results;
};

export const fetchGenres = async () => {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(url);
  const data = await response.json();
  return data.genres;
};

