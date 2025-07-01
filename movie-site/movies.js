const ACCESS_TOKEN = 'token'; // 실제 토큰 

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
