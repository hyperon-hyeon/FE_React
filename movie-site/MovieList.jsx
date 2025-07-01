import React, { useEffect, useState } from 'react';
import { fetchMovies } from './movies';
import styles from './MovieList.module.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies()
      .then((data) => setMovies(data.results))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>에러 발생: {error}</div>;
  if (!movies.length) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>Top 20</h2>
      <ul className={styles.movie}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movieList}>
            <img 
                src={'https://image.tmdb.org/t/p/w200' + movie.poster_path} 
                alt={movie.title} 
                className={styles.poster}
            />
            <br></br>
            <strong>{movie.title}</strong> ({movie.release_date?.slice(0, 4)})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
