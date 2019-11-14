import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm"
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies,setMovies] =useState([]);
  const [id,setId] =useState([])
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => setMovies(res.data))

      .catch(error => console.log(error));
  }, []);


  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} id ={id} movies= {movies}/>;
        }} 
      />

      <Route path ="/update-movie/:id" render ={props => {
        return ( 
          <UpdateMovieForm  {...props} movies={movies} setMovies ={setMovies}
          />
        )
      }}
      />
    </>
  );
};

export default App;
