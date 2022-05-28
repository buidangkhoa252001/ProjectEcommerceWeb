const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/khoa252001/image/upload/v1650936344/test/unknownuser_bh4p19.png"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)