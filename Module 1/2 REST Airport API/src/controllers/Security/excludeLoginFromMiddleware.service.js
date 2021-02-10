const excludeLoginFromMiddleware = (middleware) => (req, res, next) => {
    console.log(middleware)
    if (req.path.match(/^\/login\/?$/g)) {
        return next()
    } else {
        return middleware(req, res, next)
    }
}

export default excludeLoginFromMiddleware