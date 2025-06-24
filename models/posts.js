import mongoose from 'mongoose'
import suggestions from './suggestions';

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

postSchema.index( { title: -1 })

export default mongoose.model('Posts', postSchema)

