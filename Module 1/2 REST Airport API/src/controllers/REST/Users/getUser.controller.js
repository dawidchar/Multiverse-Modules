import getUserFromDB from '../../../utils/getUserFromDB.service'

const getUser = async (req, res) => {

    const user = await getUserFromDB(req.params.username)

    return user ? res.send(user) : res.status(204).send()
}

export default getUser