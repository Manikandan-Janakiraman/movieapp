import './App.css'
import { useState, useEffect } from 'react'
import SearchIcon from "./search.svg"
import MovieCard from './MovieCard'


const API_URL = 'http://www.omdbapi.com/?apikey=9075ce11'

// const movie = {
//   "Title": "Batman Begins",
//   "Year": "2005",
//   "imdbID": "tt0372784",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMzA2NDQzZDEtNDU5Ni00YTlkLTg2OWEtYmQwM2Y1YTBjMjFjXkEyXkFqcGc@._V1_SX300.jpg"
// }

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search)

  }

  useEffect(() => {
    searchMovie("Batman")
  }, []);

  return (
    <>
      <div className='app'>
        <h1>Movie Explorer</h1>

        <div className='search'>
          <input placeholder='search for movies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

          <img src={SearchIcon} alt="search" onClick={() =>
            searchMovie(searchTerm)} />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className='empty'>
            <h2>No Movies Found</h2>
          </div>
        )}

      </div>

    </>
  )
}

export default App
