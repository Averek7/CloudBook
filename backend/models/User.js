const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    title:{
        type: String,
        required : true,
    },
    description: {
        type: String,
        requried: true
    },
    tags:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('user',UserSchema);