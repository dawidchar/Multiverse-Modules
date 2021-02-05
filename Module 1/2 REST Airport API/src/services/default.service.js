import getAirports from './getAirports.service'
import getAirport from './getAirport.service'
import postAirports from './postAirports.service'
import putAirport from './putAirport.service'
import patchAirport from './patchAirport.service'
import deleteAirport from './deleteAirport.service'


const exports = {
    getAirports,
    getAirport,
    postAirports,
    putAirport,
    patchAirport,
    deleteAirport
}

export default exports