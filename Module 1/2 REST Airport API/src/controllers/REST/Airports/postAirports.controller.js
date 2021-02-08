const postAirports = (req, res, { airports, saveAirportsData }) => {
    airports.unshift(req.body)
    saveAirportsData()
    return res.send()
}

export default postAirports