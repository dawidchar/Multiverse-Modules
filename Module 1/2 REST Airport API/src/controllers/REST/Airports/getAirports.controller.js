const perPageCount = 25

const getAirports = (req, res, { airports }) => {
    if (req.query.all != 'true') {
        const pageSize = !isNaN(req.query.pagesize) ? parseInt(req.query.pagesize) : perPageCount
        const startIndex = (!isNaN(req.query.page) ? parseInt(req.query.page) : 0) * pageSize
        return res.send(airports.slice(startIndex, startIndex + pageSize));
    } else {
        return res.send(airports);
    }
}

export default getAirports