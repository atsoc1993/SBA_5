# Skill-based Assessment #5

## Routes
- /users
- /posts
- /suggestions

### Users Route
- Allows get, post, patch & delete endpoints for new users, the schema for user only requires a username and password, emails are optional, and time of creation is also stored in database

### Posts Route
- Allows get and post endpoints for new posts, posts can only be created by users— requires authentication and username/password in body of post requests, and the author field of the post must match the username. Password and body validation checks are modularized through body-validation-js and get-password.js in /helpers directory

- ## Suggestions Route
- Allows get and post endpoints for new suggestions, suggestions only require a body and have an index set in ascending order by creation time
