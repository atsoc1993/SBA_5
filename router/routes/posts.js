import express from 'express';
import Post from '../../models/posts.js';
import { validatePostBody } from '../../helpers/body-validators.js';

let posts = express.Router();

posts
    .get('/', async (req, res, next) => {
        try {
            let postsData = await Post.find({});
            return res.send(postsData).status(200);
        } catch (err) {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        }
    })

    .post('/add_post', async (req, res, next) => {
        try {

            let newPost = req.body;
            let validationResult = validatePostBody({ requestBody: newPost });
            if (validationResult === '') {
                let result = await Post.create(newPost);
                return res.status(200).send(result);
            } else {
                let error = new Error(validationResult);
                error.status = 400;
                return next(error);
            };
        } catch (err) {
            let error = new Error(err);
            error.status = 400;
            return next(error);
        };
    })

    .patch('/update_post/new_title', async (req, res, next) => {
        try {

            if (!req.query.newTitle) {
                let error = new Error("Did not include new title");
                error.status = 400;
                return error;
            };
    
            let error = await validatePostBody({ req: req });
    
            if (!error) {
                let updated = await Post.updateOne( { _id: req.query.objectId }, { title: req.query.newTitle });
                res.send(updated);
            } else {
                return next(error);
            };
        } catch (err) {
            let error = new Error(err);
            error.status = 400;
            return next(error);
        };
    })

    .patch('/update_post/new_body', async (req, res, next) => {
        try {
            if (!req.query.newBody && !updatingTitle) {
                let error = new Error("Did not include new body");
                error.status = 400;
            };

            let error = await validatePostBody({ req: req, updatingTitle: false});

            if (!error) {
                let updated = await Post.updateOne( { _id: req.query.objectId }, { body: req.query.newBody });
                res.send(updated);
            } else {
                return next(error);
            };
        
        } catch (err) {
            let error = new Error(err);
            error.status = 400;
            return next(error);
        };
    })


    .delete('/delete_post', async (req, res, next) => {
        try {
            let error = await validatePostBody( { req: req } );
            console.log(error);
            if (!error) {
                let deleted = await Post.findByIdAndDelete( { _id: req.query.objectId });
                res.send(deleted);
            } else {
                return next(error);
            };
        

        } catch (err) {
            let error = new Error(err);
            error.status = 400;
            return next(error);
        };
    });

posts.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status).send(err.message);
});

export default posts;