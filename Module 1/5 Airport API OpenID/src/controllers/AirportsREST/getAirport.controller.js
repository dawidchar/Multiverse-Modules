const getAirport = (req, res, { airports }) => {
    const airport = airports.find(airport => airport.icao === req.params.icao)
    return airport ? res.send(airport) : res.status(204).send('Airport not Found')
}

export default getAirport