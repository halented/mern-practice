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
    Exercise.find()
    .then(res=>res.json())
    .catch(err=>{
        console.log("it's all messed up", err);
    })
})