const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true
})

// is this line migrating to the DB?
const User = mongoose.model('User', userSchema)

module.exports = User