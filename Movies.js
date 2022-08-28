'use strict'

const axios = require('axios');

async function getMovies(request, response) {
    let cityQuery = request.query.cityQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${cityQuery}`;
    let results = await axios.get(url);
    if (!results) {
        throw 'Invalid city, please submit a valid entry!';
    }
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
    response.status(200).send({ moviesArr });

    // Terminal testing:
    // Log to check data coming into the server
    console.log(results.data.results);
    // Log to check data getting sent to the front-end
    console.log(moviesArr);
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