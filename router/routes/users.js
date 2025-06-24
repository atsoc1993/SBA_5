import express from 'express';
import User from '../../models/users.js';
import { validateUserBody } from '../../helpers/body-validators.js';

let users = express.Router();

users
    .get('/', async (req, res) => {
        let usersData = await User.find({});
        res.send(usersData);
    })

    .post('/add_user', async (req, res, next) => {
        try {

            let newUser = req.body;

            let validationResult = validateUserBody({ requestBody: newUser });

            if (validationResult === '') {

                let result = await User.create(newUser);
                res.status(200).send(result);

            } else {

                let error = new Error(validationResult);
                error.status = 400;
                next(error);
            };

        } catch (err) {
            let error = new Error(err);
            error.status = 400;
            next(error);
        };
    });

users.use((err, req, res, next) => {
    res.status(err.status).send(err.message)
});

export default users;