const API_KEY = process.env.NEXT_PUBLIC_API_KEY
export const BASE_URL = 'https://api.themoviedb.org/3'

export const links = {
  netflixOriginals: '/discover/movie',
  topRated: `/movie/top_rated`,
  actionMovies: `/discover/movie`,
  comedyMovies: `/discover/movie`,
  horrorMovies: `/discover/movie`,
  romanceMovies: `/discover/movie`,
  documentaries: `/discover/movie`,
  tvShows: `/tv/popular`,
  popularMovies: `/movie/top_rated`, 
  trending: `/trending/all/week`,
}

const requests = {
  fetchNetflixOriginals: `${BASE_URL}${links.netflixOriginals}?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}${links.topRated}?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}${links.actionMovies}?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}${links.comedyMovies}?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}${links.horrorMovies}?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}${links.romanceMovies}?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}${links.documentaries}?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchTVShows: `${BASE_URL}${links.tvShows}?api_key=${API_KEY}&language=en-US&page=1`,
  fetchPopularMovies: `${BASE_URL}${links.popularMovies}?api_key=${API_KEY}&language=en-US&page=1`, 
  fetchTrending: `${BASE_URL}${links.trending}?api_key=${API_KEY}&language=en-US`,
}

export default requests