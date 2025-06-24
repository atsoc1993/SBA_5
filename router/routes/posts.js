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

            if (req.body.author !== req.body.username) {
              
                let error = new Error("Attempting to create a post where author is not equal to username")
                error.status = 400;
                return next(error);
            }
                
            let validationResult = await validatePostBody({ req: req });

            if (validationResult === null) {
                let result = await Post.create(req.body);
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
        let error; 

        try {

            if (!req.query.objectId) {
                let error = new Error("Update post title missing object ID query");
                error.status = 400;
                return next(error);
            };

            if (!req.query.newTitle) {
                error = new Error("Did not include new title");
                error.status = 400;
                return next(error);
            };

            error = await validatePostBody({ req: req });

            if (!error) {
                let updated = await Post.updateOne({ _id: req.query.objectId }, { title: req.query.newTitle });
                res.send(updated);
            } else {
                return next(error);
            };

        } catch (err) {
            error = new Error(err);
            error.status = 400;
            return next(error);
        };
    })

    .patch('/update_post/new_body', async (req, res, next) => {
        try {

            if (!req.query.objectId) {
                error = new Error("Update post title missing object ID query");
                error.status = 400;
                return error;
            };

            if (!req.query.newBody && !updatingTitle) {
                let error = new Error("Did not include new body");
                error.status = 400;
            };

            let error = await validatePostBody({ req: req, updatingTitle: false });

            if (!error) {
                let updated = await Post.updateOne({ _id: req.query.objectId }, { body: req.query.newBody });
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

            if (!req.query.objectId) {
                error = new Error("Update post title missing object ID query");
                error.status = 400;
                return error;
            };

            let error = await validatePostBody({ req: req });

            if (!error) {
                let deleted = await Post.findByIdAndDelete({ _id: req.query.objectId });
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
    res.status(err.status).send(err.message);
});

export default posts;