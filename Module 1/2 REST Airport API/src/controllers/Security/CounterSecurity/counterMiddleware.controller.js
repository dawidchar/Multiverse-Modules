import counterClass from './counter'

const middleware = (req, res, next) => {
    if (counterClass.lookup[req.session.id] || req.path == '/login') {
        next()
    } else {
        return res.redirect('/login')
    }
}

export default middleware