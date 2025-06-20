import express from 'express';
import User from '../../models/users.js';

let users = express.Router();

users
    .get('/', async (req, res) => {
        console.log('Get user endpoint hit');
        let usersData = await User.find({});
        res.send(usersData);
    })

    .post('/add_user', async (req, res) => {
        console.log("Post user endpoint hit");
    })

    .patch('/update_user', async (req, res) => {
        console.log("Patch user endpoint hit");
    })
    .delete('/delete_user', async (req, res) => {
        console.log("Delete user endpoint hit");
    });


export default users;