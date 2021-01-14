const router = require('express').Router()
let User = require('../models/user.model')

// does this make a route to /5000/users/ ? or is it just /5000/ ?
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const newUser = new User({ username })

    //save here is from mongoose
    newUser.save()
        .then(() => res.json("User added"))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router