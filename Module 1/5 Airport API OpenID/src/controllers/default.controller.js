import excludePathsFromMiddleware from './Security/excludePathsFromMiddleware.service'

import getAirports from './AirportsREST/getAirports.controller'
import getAirport from './AirportsREST/getAirport.controller'
import postAirports from './AirportsREST/postAirports.controller'
import putAirport from './AirportsREST/putAirport.controller'
import patchAirport from './AirportsREST/patchAirport.controller'
import deleteAirport from './AirportsREST/deleteAirport.controller'

import authMiddlewareController from './Security/authMiddleware.controller'

const emptyMiddleware = (req,res,next) => next()


// --------- REST ---------- //

const airportsREST = {
    getAirports,
    getAirport,
    postAirports,
    putAirport,
    patchAirport,
    deleteAirport
}

// --------- SECURITY ---------- //


const openID = {
    authMiddleware: excludePathsFromMiddleware(authMiddlewareController)
}

// --------- ROOT Properties ---------- //

const REST = {
    ...airportsREST
}

const Security = {
    excludePathsFromMiddleware,
    openID
}

// --------- EXPORT ---------- //

const exports = {
    REST,
    Security
}

export default exports