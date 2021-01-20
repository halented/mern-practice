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

// ADD NEW EXERCISE
router.route('/add').post((req, res) => {
    // formulate the posting data
    const { username, description, duration, date } = req.body
    const newE = new Exercise({
        username,
        description,
        duration: parseInt(duration),
        date: Date.parse(date)
    })
    // some sort of mongoose method
    newE.save()
        .then((exercise) => res.json(exercise))
        .catch(err => {
            console.log(err)
            return res.json("Failure! Could not add exercise. Error: " + err)
        })
})

// FIND SINGLE EXERCISE
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(ex => res.json(ex))
        .catch(err => res.json("Error! Did not locate user. " + err))
})

// DELETE EXERCISE
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Yeeted"))
        .catch(err => res.json("Error! Exercise unable to be yote. " + err))
})

// UPDATE EXERCISE
router.route('/update/:id').post((req, res) => {
    // first, find the instance
    Exercise.findById(req.params.id)
        .then(ex => {
            // next, update its attributes. (is there a way to do this more easily? and what if the request doesn't send new details for one attribute or another?)
            const { username, description, duration, date } = req.body
            ex.username = username
            ex.description = description
            ex.duration = duration
            ex.date = date

            // an async inside of an async, wowie
            ex.save()
                .then(exercise => res.json(exercise))
                .catch(err => res.json("Error! Could not save change. " + err))
        })
        .catch(err => res.json("Error! Did not locate user. " + err))
})


module.exports = router