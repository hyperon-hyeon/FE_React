# Movie site

### movie.js - 토큰을 이용하여 IMDb에서 영화 정보 불러옴

```jsx
const ACCESS_TOKEN = // 토큰정보

export async function fetchMovies() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR', {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('영화 정보를 불러오지 못했습니다.');
  }

  return res.json();
}
```

- IMDb 회원가입 후 받은 토큰을 이용하여 한국어로 인기영화  목록을 요청

### MovieList.jsx - **영화 20개를 차례로 보여주는 페이지**

```jsx
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
```

- useEffect
    - 컴포넌트 최초 실행시 fetchMovies 실행
        - 성공하면 `data.results`를 `movies`에 저장
        - 실패하면 에러 메시지를 `error`에 저장
- return 내부
    - movie 하나하나당 리스트 (이미지와 제목, 개봉년도)로 만들어 화면에 보이기

### MovieList.module.css - 화면에 보일 스타일 지정

```css
body {
  background-color: #1a1a1a;
  color: #fafafa;
}

h2{
  font-size:40px;
}

header{
    width:100%;
    height:100vh;
    background: #1a1a1a;
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position:relative;
}

.header-content{
    display: grid;
    place-items: center;
    color:white;
}

h1.header-text {
  color: red !important;
}

.movie {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
  list-style: none;
  align-items: center;
  margin: 0 auto;
  background-color: #1a1a1a;
  padding-left:80px;
}

.movieList{
  font-size: 20px;
  display: flex;
  flex-direction: column; 
  align-items: center;  
  text-align: center;  
  width: 350px;
  height:400px;
  padding: 10px;
  background-color: #1a1a1a;
  color:#fafafa;
  border-radius: 6px;
  padding-bottom: 30px;
}

.poster{
  width: auto;
  height: 300px;
  margin-right: 12px;
  border-radius: 8px;
}

```

---

### App.jsx

```jsx
import React from 'react';
import MovieList from './MovieList';

function App() {
  return (
    <div>
      <h1>Today's Movie Rank</h1>
      <MovieList />
    </div>
  );
}

export default App;
```

### main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
