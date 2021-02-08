const patchAirport = (req, res, { airports, saveAirportsData }) => {
    const airportIndex = airports.findIndex(airport => airport.icao === req.params.icao)

    if (airportIndex > -1) {
        console.log(`Updating ${airports[airportIndex].name}`)
        airports[airportIndex] = Object.assign(airports[airportIndex], req.body)
        console.log(`Updated To ${JSON.stringify(airports[airportIndex], null, '\t')}`)
        saveAirportsData()
    } else {
        return res.status(204).send('Airport Not found');
    }

    return res.send(`Updated Airport Data`);
}

export default patchAirport