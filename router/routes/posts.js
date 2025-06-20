import express from 'express';
import Post from './models/posts.js';

let posts = express.Router();

posts
    .get('/', async (req, res) => {
        console.log("Get post endpoint hit");
        let postsData = await Post.find({});
        res.send(postsData);
    })

    .post('/add_post', async (req, res) => {
        console.log("Post post endpoint hit");
    })

    .patch('/update_post', async (req, res) => {
        console.log("Patch post endpoint hit");
    })

    .delete('/delete_post', async (req, res) => {
        console.log("Delete post endpoint hit");
    });


export default posts;