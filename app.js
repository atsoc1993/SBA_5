import express from 'express'
import { PORT, MONGO_URI } from './constants/constants.js'
import mongoose from 'mongoose';
import routes from './router/routes.js'

await mongoose.connect(MONGO_URI);
console.log("Connected to Mongo")
let app = express();

app.use(express.json());

app.use('/users', routes.users);

app.use('/posts', routes.posts);

app.use('/suggestions', routes.suggestions);

app.listen(PORT, () => {
    console.log(`Express app running @ http://localhost:${PORT}`);
});