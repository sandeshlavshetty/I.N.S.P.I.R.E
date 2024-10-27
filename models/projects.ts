import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    githubRepoLink: {
        type: String,
        required: true
    },
    liveOnLink: {
        type: String,
        required: true
    },
    youtubeDemoLink: {
        type: String,
        required: true
    }
});

const Project = model('Project', projectSchema);

export default Project;