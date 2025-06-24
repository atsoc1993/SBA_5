import mongoose from 'mongoose';

let suggestionSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    timePosted: {
        type: Number,
        default: Date.now,
        required: true,
    },
});

suggestionSchema.index( { timePosted: - 1 } );

export default mongoose.model('Suggestions', suggestionSchema);