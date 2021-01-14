const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

// line below actually creates the express server
const app = express()
// line below defines the port; process.env is from Nodejs, it returns an object containing the user environment.
const port = process.env.PORT || 5000

// telling the app to use cors here of course. perhaps go back and connect the dots here once your app is a bit more built out. where does this line come into play?
// this stuff is called "middleware"
app.use(cors())
// this line lets everybody know our server is cool to both serve and receive JSON.
app.use(express.json())

// This section actually connects our local code the mongoDB, using mongoose 
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection
connection.once('open', () => {
    console.log("'Ain't such a bad day after all,' she says.");
})

// we are ALSO creating our DB schema with mongoose. models: exercises/users. these live in a separate folder.

// here we are specifying the routes for our app. 
const exercisesRouter = require('./routes/exercises.routes')
const usersRouter = require('./routes/users.routes')

// app.use('./exercises', exercisesRouter)
// app.use('./users', usersRouter)


// I was able to run this server using the command `nodemon server`. presumably similar to yarn start. 
app.listen(port, () => {
    console.log(`server is a country kid with a sock tan hanging out on port ${port}`)
})