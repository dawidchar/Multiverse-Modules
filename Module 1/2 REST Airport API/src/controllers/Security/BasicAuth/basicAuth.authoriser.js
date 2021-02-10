import bcrypt from 'bcrypt'
import getUserFromDB from '../../../utils/getUserFromDB.service'

async function Authorizer(username, password, cb) {
    const user = await getUserFromDB(username, { showPassword: true })

    if (!user || !password) return cb(null, false)

    const passwordCorrect = await bcrypt.compare(password, user.password)
    cb(null, passwordCorrect)
}

export default Authorizer