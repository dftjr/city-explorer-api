'use strict'

const axios = require('axios');

async function getWeather (request, response) {
    let latQuery = request.query.latQuery;
    let lonQuery = request.query.lonQuery;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latQuery}&lon=${lonQuery}&key=${process.env.REACT_APP_WEATHER_API_KEY}`;
    let results = await axios.get(url);
    
    if (!results) {
        throw 'Invalid city, please submit a valid entry!';
    }

    let forecastArr = results.data.data.map((weather) => {

        return new Forecast(({
            description: `Low of ${weather.low_temp}, high of ${weather.high_temp} with ${weather.weather.description}`,
            date: weather.valid_date
        }))
    })
    response.status(200).send({ forecastArr });
    
    // Terminal testing:
    // Log to check data coming into the server
    console.log(results.data.data);
    // Log to check data getting sent to the front-end
    console.log(forecastArr);
};

class Forecast {
    constructor(weather) {
        this.description = weather.description;
        this.date = weather.date;
    }
}

module.exports = getWeather;