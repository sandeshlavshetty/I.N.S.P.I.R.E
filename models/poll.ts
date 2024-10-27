import {Schema, model} from 'mongoose';

const voteSchema = new Schema({
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

const Poll = model('Poll', voteSchema);

export default Poll;