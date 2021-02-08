import getAirports from './REST/Airports/getAirports.controller'
import getAirport from './REST/Airports/getAirport.controller'
import postAirports from './REST/Airports/postAirports.controller'
import putAirport from './REST/Airports/putAirport.controller'
import patchAirport from './REST/Airports/patchAirport.controller'
import deleteAirport from './REST/Airports/deleteAirport.controller'


const exports = {
    getAirports,
    getAirport,
    postAirports,
    putAirport,
    patchAirport,
    deleteAirport
}

export default exports