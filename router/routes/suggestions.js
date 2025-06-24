import express from 'express';
import Suggestion from '../../models/suggestions.js';
import { validateSuggestionBody } from '../../helpers/body-validators.js';

let suggestions = express.Router();

suggestions
    .get('/', async (req, res) => {
        let suggestionsData = await Suggestion.find({});
        return res.send(suggestionsData);
    })

    .post('/add_suggestion', async (req, res, next) => {
        let newSuggestion = req.body
        let validationResult = validateSuggestionBody({ requestBody: newSuggestion })
        if (validationResult === '') {
            try {
                let result = await Suggestion.create(newSuggestion);
                return res.status(200).send(result)
            } catch (err) {
                let error = new Error(err)
                error.status = 400
                return next(error)
            }
        } else {
            let error = new Error(validationResult)
            error.status = 400
            return next(error)
        }
    })


suggestions.use((err, req, res, next) => {
    res.status(err.status).send(err.message)
});

export default suggestions;