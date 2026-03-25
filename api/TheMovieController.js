const express = require('express')
const router = express.Router()

router.all('/', (req, res, next) => {
    console.log('Accessing the middleware section ... MovieController')
    next() // pass control to the next handler
})

// GET method route
router.get('/', async (req, res) => {

    const params = new URLSearchParams({
        ...req.query,
        // api_key: process.env.API_KEY_MOVIE_DB
    })

    const url = `https://${process.env.URL_HOST_MOVIE_DB}/3/discover/movie?${params.toString()}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_TOKEN_ACCESS_MOVIE_DB}`
        }
    };

    const data = await fetch(url, options)
        .then(res => res.json())
        // .then(json => console.log(json))
        .catch(err => console.error(err));

    res.json(data);
});

router.get('/genres', async (req, res) => {
    
    const url = `https://${process.env.URL_HOST_MOVIE_DB}/3/genre/movie/list`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_TOKEN_ACCESS_MOVIE_DB}`
        }
    };

    const data = await fetch(url, options)
        .then(res => res.json())
        // .then(json => console.log(json))
        .catch(err => console.error(err));

    res.json(data);
});

module.exports = router