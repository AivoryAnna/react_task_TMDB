import { useEffect, useState, useCallback } from "react";
import { fetchMovies } from "../api";

// This custom hook for fetching movies by genre

export default function useMovies(genreId) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Stable function to load more movies when page or genreId changes
    const loadMore = useCallback(async () => {
        const newMovies = await fetchMovies(page, genreId);
        if (newMovies.length === 0) {
            setHasMore(false);
        } else {
            // I use spread operator to append new movies to the existing list
            setMovies((prev) => [...prev, ...newMovies]);
            setPage((prev) => prev + 1);
        }
    }, [page, genreId]);

    // Reset movie list when genre changes
    useEffect(() => {
        setMovies([]);
        setPage(1);
        setHasMore(true);
    }, [genreId]);
    // Load movies when page or genre changes
    useEffect(() => {
        loadMore();
    }, [page, genreId, loadMore]);

    return { movies, loadMore, hasMore };
}
