import User from '../models/user.model'

const usernameOnlyProjection = 'username -_id'

const getUser = (username, options = {}) => {
    const usernameRegex = new RegExp(`^${username.toLowerCase()}$`)
    return User.findOne({ username: { '$regex': usernameRegex, $options: 'i' } }).select(options.showPassword ? null : usernameOnlyProjection);
}

export default getUser