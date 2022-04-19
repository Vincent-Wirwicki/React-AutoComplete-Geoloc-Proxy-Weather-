const express = require('express')
const axios = require('axios')
const path = require('path')
const cors = require('cors')
const apicache = require('apicache')
const rateLimit = require('express-rate-limit')

require('dotenv').config()

const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

let cache = apicache.middleware

const port = process.env.PORT || 5000;
const app = express();

app.use(cors())

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 20,
  })

app.use(limiter)
app.set('trust proxy', 1)

app.get('/api/weather', cache('1 minutes'), (req,res) => {
    
    const {lon, lat} = req.query
    const qLat = lat
    const qLon = lon

    const options = {
        method: 'GET',
        url:"https://api.openweathermap.org/data/2.5/onecall",
        params: {lat: qLat, lon: qLon, [API_KEY_NAME]:API_KEY_VALUE },
    }
    axios.request(options)
     .then(response=> res.json(response.data))
     .catch(err => console.log(err))
})

app.get('/api/direct', cache('1 minutes'), (req,res) => {
    
    const city = req.query.q
    
    const options = {
        method: 'GET',
        url:"https://api.openweathermap.org/geo/1.0/direct",
        params: {q: city, [API_KEY_NAME]:API_KEY_VALUE },
    }
    axios.request(options)
    .then(response=> res.json(response.data))
    .catch(err => console.log(err))
})

app.get('/api/reverse', cache('1 minutes'), (req,res) => {
    
    const {lat, lon} = req.query
    const qLat = lat
    const qLon = lon
    
    const options = {
        method: 'GET',
        url:"https://api.openweathermap.org/geo/1.0/reverse",
        params: {lat: qLat, lon: qLon, [API_KEY_NAME]:API_KEY_VALUE },
    }

    axios.request(options)
    .then(response => res.json(response.data))
    .catch(err => console.log(err))
})

app.use(express.urlencoded({ extended: true }));
app.use(express.static("client"));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

app.listen(port);

console.log(`App is listening on port ${port}`);