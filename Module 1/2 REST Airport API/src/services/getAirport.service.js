const getAirport = (req, res, { airports }) => {
    const airport = airports.find(airport => airport.icao === req.params.icao)
    return res.send(airport);
}

export default getAirport