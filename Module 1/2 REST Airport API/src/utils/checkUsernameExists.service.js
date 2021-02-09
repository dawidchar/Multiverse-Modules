import User from '../models/user.model'

const checkUsernameExists = (username) => {
    const usernameRegex = new RegExp(`^${username.toLowerCase()}$`)
    return new Promise((resolve, reject) => {
        User.exists({ username: { '$regex': usernameRegex, $options: 'i' } }, (err, result) => (err) ? reject(err) : resolve(result))
    })
}

export default checkUsernameExists