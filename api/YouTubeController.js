const express = require('express')
const router = express.Router()

router.all('/', (req, res, next) => {
    console.log('Accessing the middleware section ... YouTubeController')
    next() // pass control to the next handler
})

router.get('/', (req, res) => {

    res.json({
        status: 'OK',
        path: 'req.path',
        controller: 'YouTubeController'

    })
})

router.get('/video', async (req, res) => {

    const params = new URLSearchParams({
        ...req.query,
        key: process.env.API_KEY_GOOGLE_API
    })
    // console.log(req.query, params)

    const url = `https://${process.env.URL_HOST_GOOGLE_API}/youtube/v3/search?${params.toString()}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    const data = await fetch(url, options)
        .then(res => res.json())
        .then(json => json)
        .catch(err => console.error(err));

    // console.log(data)
    res.json(data);


    // res.json({
    //     status: 'OK',
    //     path: 'req.path',
    //     controller: 'YouTubeController'

    // })

})

module.exports = router