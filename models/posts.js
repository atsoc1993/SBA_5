import mongoose from 'mongoose'

let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    timePosted: {
        type: Number,
        default: Date.now
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

export default mongoose.model('Posts', postSchema)

