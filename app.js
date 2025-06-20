import express from 'express'
import { PORT, MONGO_URI } from './constants.js'

let app = express();

app.use(express.json());

app.use('/users', users)

app.use('/posts', posts)

app.use('/suggestions', suggestions)

app.listen(PORT, () => {
    console.log(`Express app running @ http://localhost${PORT}`)
})