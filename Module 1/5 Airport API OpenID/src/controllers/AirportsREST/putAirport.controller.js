const putAirport = (req, res, { airports, saveAirportsData }) => {
    const airportIndex = airports.findIndex(airport => airport.icao === req.params.icao)
    const originalAirportICAO = airports[airportIndex].icao

    if (airportIndex > -1) {
        airports[airportIndex] = req.body
        saveAirportsData()
    } else {
        return res.status(204).send('Airport Not found');
    }

    return res.send(`Replaced Airport Data ${originalAirportICAO} --> ${airports[airportIndex].icao}`);
}

export default putAirport