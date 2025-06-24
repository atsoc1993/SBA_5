import mongoose from 'mongoose'

let suggestionSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        unique: true
    },
    timePosted: {
        type: Number,
        default: Date.now,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous',
        required: true
    }
});

export default mongoose.model('Suggestions', suggestionSchema)