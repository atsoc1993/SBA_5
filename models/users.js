import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Number,
        default: Date.now,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: 'Not Provided',
        required: true
    }
});

userSchema.index( { username: 1 } );
export default mongoose.model('Users', userSchema);

