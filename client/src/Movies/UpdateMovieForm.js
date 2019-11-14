import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {

    title: '',
    director: '',
    metascore: "",
    stars: ""
};

const UpdateMoiveForm = props => {
  const [Movie, setMovie] = useState(initialMovie);
  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'price') {
      value = parseInt(value, 10);
    }
    setMovie({
      ...Movie,
      [ev.target.name]: value
    });
  };

  useEffect(() => {
   
    if (props.movies.length > 0) {
      const newMovie = props.movies.find(
        thing => `${thing.id}` === props.match.params.id
      );
      setMovie(newMovie);
    }
  }, [props.movies, props.match.params.id]);

  const handleSubmit = e => {

    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        props.updateMovies(res.data);
        props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  
  if (props.movies.length === 0) {
    return <h2>Loading data...</h2>;
  }

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />


        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />


        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="5"
          value={movie.metascore}
        />
  

        <input
          type="number"
          name="stars"
          onChange={changeHandler}
          placeholder="3"
          value={movie.stars}
        />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMoiveForm;
