import React from 'react';
import MovieList from '../movieList/MovieList';
import './MainLayout.css';
import Sidebar from '../sidebar/Sidebar';

const MainLayout = () => {
    return (
        <div className="movie-page-layout">
            <aside className="sidebar">
                <Sidebar />
            </aside>

            <main className="movies">
                <MovieList />
            </main>
        </div>
    );
};

export default MainLayout;