const isAuthenticated = (req,res,next) => {
    if (req.oidc.isAuthenticated()){
        next()
    }else{
        res.status(401).send('Please Log In First')
    }
}