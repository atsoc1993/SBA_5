import Post from '../models/posts.js';
import getPasswordFromUsername from '../helpers/get-password.js';

function validateUserBody({ requestBody: body}) {
    let errorMessage = 'New user missing the following elements: ';
    let missingItemsAndItemStrings = [[!body.username, 'username'], [!body.password, 'password']];
    if (!missingItemsAndItemStrings[0][0] && !missingItemsAndItemStrings[1][0]) {
        return '';
    } else {
        for (let missingItem of missingItemsAndItemStrings) {
            if (missingItem[0]) {
                errorMessage += missingItem[1] + ' ';
            };
        };
        return errorMessage;
    };
};

function validateSuggestionBody({ requestBody: body}) {
    let errorMessage = 'New suggestion missing the following elements: ';
    let missingItemsAndItemStrings = [[!body.body, 'body'], [!body.author, 'author']];
    if (!missingItemsAndItemStrings[0][0] && !missingItemsAndItemStrings[1][0]) {
        return '';
    } else {
        for (let missingItem of missingItemsAndItemStrings) {
            if (missingItem[0]) {
                errorMessage += missingItem[1] + ' ';
            };
        };
        return errorMessage;
    };
};

async function validatePostBody ({ req }) {
        let userInfo = req.body;

        let error = null;

        if (!userInfo) {
            error = new Error("Missing body with username and password");
            error.status = 400;
            return error;
        };
        
        if (!userInfo.username | !userInfo.password) {
            error = new Error("Missing username or password in body");
            error.status = 400;
            return error;
        };
        
        if (!req.query.objectId) {
            error = new Error("Update post title missing object ID query");
            error.status = 400;
            return error;
        };
        
        let currentPost = await Post.findById( req.query.objectId );
        
        if (!currentPost) {
            error = new Error("Post ID does not exist");
            error.status = 400;
            return error;
        };
        
        
        if (currentPost.author !== userInfo.username) {
            error = new Error("Post not created by user attempting to update");
            error.status = 400;
            return error;
        };
        
        let correctPassword = await getPasswordFromUsername( { username: userInfo.username });

        if (!correctPassword) {
            error = new Error("User does not exist");
            error.status = 400;
            return error;
        };
        
        if (userInfo.password !== correctPassword) { 
            error = new Error("Incorrect password for username");
            error.status = 400;
            return error;
        };
        
        return error;
};

export { validatePostBody, validateUserBody, validateSuggestionBody } ;