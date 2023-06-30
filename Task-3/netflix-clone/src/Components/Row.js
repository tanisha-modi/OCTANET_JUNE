import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] =  useState("");

  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=213  for netflix originals
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // if [], run once when the row/page loads, and dont run again
    // if [movies], run once when the row/page loads, and run every single time movies changes
  }, [fetchUrl]);
  // console.table(movies);


  const opts ={
    height : "300",
    width : "100%",
    playerVars:{
      autoplay: 1,
    }
  }

  const handleClick = (movie) => {
    if(trailerUrl){
      setTrailerUrl("");
    }else{
      movieTrailer(movie?.name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      }).catch((error) => console.log(error));
    }
  }

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>
      
      {/* container -> posters  */}
      <div className="row_posters">
        {/* several row posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}

    </div>
  );
}

export default Row;
