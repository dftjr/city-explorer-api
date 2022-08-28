'use strict'

console.log('Server starting');

// Constants
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(cors());
require('dotenv').config();

let data = require('./data/weather.json');

app.get('/', (request, response) => {
    response.send('Hello from our server!');
});



app.get('/weather', async (request, response) => {
    console.log('hi')
    let latQuery = request.query.latQuery;
    let lonQuery = request.query.lonQuery;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latQuery}&lon=${lonQuery}&key=${process.env.REACT_APP_WEATHER_API_KEY}`;
    let results = await axios.get(url);
    // console.log(results);        
    console.log(results.data.data);
    if (!results) {
        throw 'Invalid city, please submit a valid entry!';
    }

    let forecastArr = results.data.data.map((weather) => {

        return new Forecast(({
            description: `Low of ${weather.low_temp}, high of ${weather.high_temp} with ${weather.weather.description}`,
            date: weather.valid_date
        }))
    })
    response.send({ forecastArr });
});

app.get('/movies', async (request, response) => {
    console.log('hi')
    let cityQuery = request.query.cityQuery;
    console.log(cityQuery);
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${cityQuery}`;
    console.log(url);
    let results = await axios.get(url);
    console.log(results);
    if (!results) {
        throw 'Invalid city, please submit a valid entry!';
    }
    console.log(results.data.results)
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
    response.send({ moviesArr });
});


// app.get('/weather', (request, response) => {
//     console.log('hi')
//         // let lat = request.query.lat;
//         // let lon = request.query.lon;
//         console.log(request.query);
//         let city_name = request.query.searchQuery;
//         let result = data.find(weather => weather.city_name.toLowerCase() === city_name.toLowerCase());
//         if (!response) {
//             throw 'Invalid city, please submit a valid entry!';
//         }

//         let forecastArr = result.data.map((weather) => {
//             return new Forecast(({
//                 description: `Low of ${weather.low_temp}, high of ${weather.high_temp} with broken clouds`,
//                 date: weather.valid_date
//             }))
//         })
//         response.send({ forecastArr });
// });


app.get('*', (request, response) => {
    response.send('Route does not exsist!');
});


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

class Forecast {
    constructor(weather) {
        this.description = weather.description;
        this.date = weather.date;
    }
}

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
