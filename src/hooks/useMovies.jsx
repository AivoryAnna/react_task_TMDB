import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchMovies } from "../services/api";
import { removeDuplicates } from "./removeDuplicates";



export default function useMovies(genreIds) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const genreKey = useMemo(() => genreIds.slice().sort().join(","), [genreIds]);

  useEffect(() => {
    const loadFirstPage = async () => {
      setLoading(true);
      try {
        const newMovies = await fetchMovies(1, genreIds);
        setMovies(newMovies);
        setPage(2);
        setHasMore(newMovies.length > 0);
      } catch (error) {
        console.error("Error loading movies:", error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadFirstPage();
  }, [genreKey, genreIds]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newMovies = await fetchMovies(page, genreIds);

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => {
          // I remove duplicates due to unstable sorting
          const unique = removeDuplicates(prev, newMovies);
          return [...prev, ...unique];
        });

        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading movies:", error);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, genreIds]);


  return { movies, loadMore, hasMore, loading, error };
}


