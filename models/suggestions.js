import mongoose from 'mongoose'

let suggestionSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    timePosted: {
        type: Number,
        default: new Date.now,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous',
        required: true
    }
});

export default mongoose.model('Suggestions', suggestionSchema)