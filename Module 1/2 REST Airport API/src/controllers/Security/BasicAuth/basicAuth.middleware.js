import basicAuth from 'express-basic-auth'
import basicAuthAuthoriser from './basicAuth.authoriser'

export default basicAuth({ challenge: true, authorizer: basicAuthAuthoriser, authorizeAsync: true })
