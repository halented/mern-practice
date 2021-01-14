// express router
const router = require('express').Router()
// mongoose router
let User = require('../models/user.model')

// this makes 5000/users/
// note that inside server.js, we specified the routes using `app.use('./users', usersRouter)`
// if './users/' was not handed to app.use, it would not have nested this route properly.
router.route('/').get((req, res) => {

    //find here is from mongoose
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const newUser = new User({ username })
    console.log(newUser)

    //save here is from mongoose
    newUser.save()
        .then((user) => {
            console.log(user);
            return res.json("User added")
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router