const deleteAirport = (req, res, { airports, saveAirportsData }) => {
    const airportIndex = airports.findIndex(airport => airport.icao === req.params.icao)

    if (airportIndex > -1) {
        airports.splice(airportIndex, 1);
        saveAirportsData()
    } else {
        return res.status(204).send('Airport Not found');
    }

    return res.send('Deleted Airport')
}

export default deleteAirport