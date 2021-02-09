import User from '../../../models/user.model'
import checkUsernameExists from '../../../utils/checkUsernameExists.service'
import checkUsernameIsValid from '../../../utils/checkUsernameIsValid.service'
// import getUserFromDB from '../../../utils/getUserFromDB.service'

const getUser = async (req, res) => {
    const username = req.params.username.toLowerCase()

    console.log(req.body)
    if (!Object.keys(req.body).length) return res.status(412).send('No Update Body Provided')
    if (!checkUsernameIsValid(username)) return res.status(412).send('Invalid Username Format')
    if (!await checkUsernameExists(username)) return res.status(404).send('Username Not Found')

    // const user = await getUserFromDB(req.params.username, { showPassword: true })

    // Object.assign(user, req.body)

    await User.findOneAndUpdate({ username }, req.body)

    return res.send(`Updated ${username}`)
}

export default getUser