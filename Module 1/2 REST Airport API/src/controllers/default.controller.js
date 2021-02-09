import getAirports from './REST/Airports/getAirports.controller'
import getAirport from './REST/Airports/getAirport.controller'
import postAirports from './REST/Airports/postAirports.controller'
import putAirport from './REST/Airports/putAirport.controller'
import patchAirport from './REST/Airports/patchAirport.controller'
import deleteAirport from './REST/Airports/deleteAirport.controller'

import getUsers from './REST/Users/getUsers.controller'
import getUser from './REST/Users/getUser.controller'
import postUsers from './REST/Users/postUsers.controller'
import patchUser from './REST/Users/patchUser.controller'

import getCounter from './Security/CounterSecurity/getCounter.controller'
import counterLogin from './Security/CounterSecurity/counterLogin.controller'
import counterLogout from './Security/CounterSecurity/counterLogout.controller'
import counterMiddleware from './Security/CounterSecurity/counterMiddleware.controller'

import basicAuth from './Security/basicAuth.controller'


const airportsREST = {
    getAirports,
    getAirport,
    postAirports,
    putAirport,
    patchAirport,
    deleteAirport
}

const usersREST = {
    getUsers,
    getUser,
    postUsers,
    patchUser
}

const counterSecurity = {
    getCounter,
    counterLogin,
    counterLogout,
    counterMiddleware
}



// ------------------- //

const REST = {
    ...airportsREST,
    ...usersREST
}

const Security = {
    basicAuth,
    counterSecurity
}

// ------------------- //

const exports = {
    REST,
    Security
}

export default exports