import counterClass from './counter'

const counterLogin = (req, res) => {
    counterClass.lookup[req.session.id] = new counterClass(req.session.id)
    return res.redirect('/docs')
}

export default counterLogin