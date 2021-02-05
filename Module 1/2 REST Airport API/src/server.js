const isdev = false

// Express
import express from 'express';
import bodyParser from 'body-parser'
const app = express();

// Utils and services
import service from './services/default.service'
import fileUtils from './utils/fileUtils'
const { getFile, saveFile } = fileUtils

// Airports json
const airportsFileName = isdev ? 'assets/airportstest.json' : 'assets/airports.json'
const airports = getFile(airportsFileName)

// Swagger components
import swaggerUi from 'swagger-ui-express'
const swaggerDocument = getFile('assets/docs/APIdocs.json')

// Setup Middleware
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

const saveAirportsData = () => saveFile(airportsFileName, airports)


// Main App

// GET - All Airports
app.get('/airports', (req, res) => {
  return service.getAirports(req, res, { airports })
});

// POST - Add New Airport
app.post("/airports", (req, res) => {
  return service.postAirports(req, res, { airports, saveAirportsData })
});

// GET - A Single Airport
app.get('/airport/:icao', (req, res) => {
  return service.getAirport(req, res, { airports })
});

// PUT - Replace an Aiport's Data
app.put('/airport/:icao', (req, res) => {
  return service.putAirport(req, res, { airports, saveAirportsData })
});

// PATCH - Updates an Aiport's Data
app.patch('/airport/:icao', (req, res) => {
  return service.patchAirport(req, res, { airports, saveAirportsData })
});

// DELETE - Delete an Airport
app.delete('/airport/:icao', (req, res) => {
  return service.deleteAirport(req, res, { airports, saveAirportsData })
});

export default app
