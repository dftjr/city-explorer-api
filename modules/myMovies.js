'use strict'

const axios = require('axios');

let cache = require('./cache.js');

async function getMovies(request, response) {
    let city = request.query.city;
    let key = city + 'Data';
    let timeToCache = 1000 * 60 * 60 * 24 * 30;
    if (cache[key] && Date.now() - cache[key].timestamp < timeToCache) {
        console.log('Cache hit');
        response.status(200).send(cache[key]);
    } else {
        console.log('Cache miss');

        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${city}`;
        let results = await axios.get(url);

        let moviesArr = results.data.results.map((film) => {

            return new Movies(({
                title: film.title,
                overview: film.overview,
                average_votes: film.vote_average,
                total_votes: film.total_count,
                image_url: film.poster_path,
                popularity: film.popularity,
                released_on: film.release_date
            }))
        })

        cache[key] = {
            moviesArr: moviesArr,
            timestamp: Date.now()
        };
        console.log(cache);
        console.log(cache[key]);
        console.log(moviesArr);
        response.status(200).send({ moviesArr });
        // Terminal testing:
        // Log to check data coming into the server
        // console.log(results.data.results);
        // // Log to check data getting sent to the front-end
    };
};

class Movies {
    constructor(film) {
        this.title = film.title;
        this.overview = film.overview;
        this.average_votes = film.average_votes;
        this.total_votes = film.total_votes;
        this.image_url = film.image_url;
        this.popularity = film.popularity;
        this.released_on = film.released_on;
    }
}


module.exports = getMovies;