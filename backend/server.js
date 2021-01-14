const express = require('express')
const cors = require('cors')

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


// I was able to run this server using the command `nodemon server`. presumably similar to yarn start. 
app.listen(port, ()=>{
    console.log(`server is a country kid hanging out in the afternoon breeze on port ${port}`)
})