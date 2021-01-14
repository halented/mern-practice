// creating a route!
// first thing you need is express's route maker thingy.
const router = require('express').Router()

// next, you need to import the associated model. 
const Exercise = require('../models/exercise.model.js')

// then, begin defining the route (it's a func you can call on express's router.)
// arg for the route method is the path itself. on that, you can call the HTTP verb.
// arg for the the HTTP call is an anon function which executes a fetch inside of it.
// a little unclear on the step by step for the route but we'll walk back through it once the app is in action i spose.
router.route('/').get((req, res) => {

    // important to notice that we are using "res" from the params of the anonymous function
    // and that the response from the mongoose call should be the exercises themselves
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => {
            console.log("it's all messed up", err);
        })
})

router.route('/add').post((req, res) => {
    // request and response here. not super clear on what these are. gonna log it
    console.log("request from inside the add post route for exercises", req);
    console.log("response from inside the add post route for exercises", res);

    // formulate the posting data
    const { username, description, duration, date } = req.body
    const newE = new Exercise({
        username,
        description,
        duration: parseInt(duration),
        date: Date.parse(date)
    })
    // some sort of mongoose method
    Exercise.save(newE)
        .then(() => res.json(newE))
        .catch(err => console.log)
})

module.exports = router