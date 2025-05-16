import React from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';

const dummy = [
    {
        title: "Warfare",
        poster_path: "/path1.jpg",
        release_date: "2025-04-17",
        vote_average: 7.2
    },
    {
        title: "A Minecraft Movie",
        poster_path: "/path2.jpg",
        release_date: "2025-04-03",
        vote_average: 6.4
    },
];


const MovieList = () => {
    return (
        <div className="movie-list">
            {dummy.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;