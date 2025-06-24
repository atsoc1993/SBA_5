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
        let newUser = req.body
        let validationResult = validateUserBody({ requestBody: newUser })
        if (validationResult === '') {
            try {
                let result = await User.create(newUser);
                res.status(200).send(result)
            } catch (err) {
                let error = new Error(err)
                error.status = 400
                next(error)
            }
        } else {
            let error = new Error(validationResult)
            error.status = 400
            next(error)
        }
    })

    .patch('/update_user', async (req, res) => {
        console.log("Patch user endpoint hit");
    })
    
    .delete('/delete_user', async (req, res) => {
        console.log("Delete user endpoint hit");
    });


users.use((err, req, res, next) => {
    res.status(err.status).send(err.message)
});

export default users;