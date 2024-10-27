import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Internship', 'Full-time', 'Part-time', 'Contract'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    applyLink: {
        type: String,
        required: true
    }
});

const Job = model('Job', jobSchema);

export default Job;