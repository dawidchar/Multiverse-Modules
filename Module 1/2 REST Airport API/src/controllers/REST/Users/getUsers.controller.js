import User from '../../../models/user.model'

const getUsers = async (req, res) => {
    const users = await User.find({}).select('username -_id');

    return res.send(users)
}

export default getUsers