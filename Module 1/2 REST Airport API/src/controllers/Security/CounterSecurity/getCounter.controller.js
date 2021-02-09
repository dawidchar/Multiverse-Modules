import counterClass from './counter'

const getCounter = (req, res) => {
    counterClass.lookup[req.session.id].inc()
    return res.send(counterClass.lookup[req.session.id])
}

export default getCounter