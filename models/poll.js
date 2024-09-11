const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const voteSchema = mongoose.Schema({
    p_describe : String,
    date:{
        type: Date,
        default: Date.now
    },
    visibility : String,
    option1_name : String,
    option2_name : String,
    option3_name : String,
    option4_name : String,
    option5_name : String,
    option1 : Number,
    option2 : Number,
    option3 : Number,
    option4 : Number,
    option5 : Number
});

module.exports = mongoose.model('poll', voteSchema);



