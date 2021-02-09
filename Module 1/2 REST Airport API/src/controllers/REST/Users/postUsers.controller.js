import User from '../../../models/user.model'
import checkUsernameExists from '../../../utils/checkUsernameExists.service'
import checkUsernameIsValid from '../../../utils/checkUsernameIsValid.service'

const postUsers = async (req, res) => {

    const username = req.body.username.toLowerCase()
    const password = req.body.password

    if (!username || !password) return res.status(412).send('Missing Username or Password')
    if (!checkUsernameIsValid(username)) return res.status(412).send('Invalid Username Format')
    if (await checkUsernameExists(username)) return res.status(409).send('Username Taken')

    User.create({ username, password })

    return res.send('Succesfully Created User')
}

export default postUsers