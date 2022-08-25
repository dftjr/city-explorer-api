'use strict'

console.log('Server starting');

// Constants
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();


require('dotenv').config();

let data = require('./data/weather.json');

app.get('/', (request, response) => {
    response.send('Hello from our server!');
});

app.get('/weather', (request, response) => {
        // let lat = request.query.lat;
        // let lon = request.query.lon;
        let city_name = request.query.searchQuery;
        let result = data.find(weather => weather.city_name === city_name);

        if (response) {
            throw 'Invalid city, please submit a valid entry!';
        }
        
        let forecastArr = result.data.map((weather) => {
            return new Forecast(({
                description: `Low of ${weather.low_temp}, high of ${weather.high_temp} with broken clouds`,
                date: weather.valid_date
            }))
        })
        response.send({ forecastArr });
});


app.get('*', (request, response) => {
    response.send('Route does not exsist!');
});


class Forecast {
    constructor(weather) {
        this.description = weather.description;
        this.date = weather.date;
    }
}


app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));