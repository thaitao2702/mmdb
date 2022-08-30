import React from 'react';
import { useParams } from "react-router-dom";

const Movie = () => {
    const {movieId} = useParams();
    console.log(movieId);

    return (
        <h1>Movie</h1>
    )
}

export default Movie;