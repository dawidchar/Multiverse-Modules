import counterClass from './counter'

const counterLogout = (req, res) => {
    delete counterClass.lookup[req.session.id]
    return res.status(401).send('Logged Out')
}

export default counterLogout