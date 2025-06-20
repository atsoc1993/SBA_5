import express from 'express';
import Suggestion from './models/suggestions.js';

let suggestions = express.Router();

suggestions
    .get('/', async (req, res) => {
        console.log("Get suggestion endpoint hit");
        let suggestionsData = await Suggestion.find({});
        res.send(suggestionsData);
    })

    .post('/add_suggestion', async (req, res) => {
        console.log("Post suggestion endpoint hit");
    })

    .patch('/update_suggestion', async (req, res) => {
        console.log("Patch suggestion endpoint hit");
    })
    .delete('/delete_suggestion', async (req, res) => {
        console.log("Delete suggestion endpoint hit");
    });


export default suggestions;