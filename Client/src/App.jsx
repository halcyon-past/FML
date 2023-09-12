import './App.css'
import NavBar from './components/NavBar'
import Recommend from './components/Recommend';
import Landing from './components/Landing';
import { useState } from 'react'

function App() {

  const [selectedMovie, setSelectedMovie] = useState('');

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
};

  return (
    <div className="App">
      <NavBar onMovieClick={handleMovieClick} />
      {selectedMovie?<Recommend selectedMovie={selectedMovie} />:<Landing />}
    </div>
  )
}

export default App
