'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const weather = require('./modules/weather.js');
const getMovies = require('./modules/myMovies.js');

app.use(cors());
app.get('/weather', weatherHandler);
app.get('/movies', getMovies);

async function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}   

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));