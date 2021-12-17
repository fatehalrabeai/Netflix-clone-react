import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';

const baseUrl = "https://image.tmdb.org/t/p/original";


function Row({ title, fetchUrl , isLargeRow}) {
    const [movies, setMovies ] = useState([]);

    //a snippet of code which runs based on a specific condition using useEffect
    // when this row component is loaded on the screen, I want to make a request to pull info when the row of elements loads

    /*
     *if [], run once when the row loads, and don't run again
     * if we passed a variable to [] for ex: [movies], it will run once when the row loads and its gonna run every time movies change
      *if we leave it blank it will run once only on page
    */
    useEffect(() => {
        //We need to use an async function, because I'm sending a request outside to the third party service

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();

        /* whenever us use a variable outside of the useEffect function, you have to put it inside the array of inputs,
        because it dependant on that variable*/

    }, [fetchUrl]);

    // console.log(movies);
    return(
        <div className="row">
            <h2>{ title }</h2>

            <div className="row__posters">
                {/* several row__posters*/}

                {movies.map(movie => (

                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                         src={`${baseUrl}${isLargeRow ?  movie.poster_path : movie.backdrop_path}`}
                         alt={movie.name}/>
                ))}
            </div>

        </div>
    )
}

export default Row;