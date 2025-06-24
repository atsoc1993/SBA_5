import User from '../models/users.js';

async function getPasswordFromUsername({ username }) {
    let user = await User.findOne( { username: username })
    let password = user.password
    return password
}

export default getPasswordFromUsername