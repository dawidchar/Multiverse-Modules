const isdev = false

// Express
import express from 'express';
import bodyParser from 'body-parser'
import basicAuth from 'express-basic-auth'
import swaggerUi from 'swagger-ui-express'
const app = express();

// Database
import mongoose from "mongoose"

// Utils and services
import Controller from './controllers/default.controller'
import fileUtils from './utils/fileUtils'
const { getFile, saveFile } = fileUtils

// Airports json
const airportsFileName = isdev ? 'assets/airportstest.json' : 'assets/airports.json'
const airports = getFile(airportsFileName)

// Swagger components
const swaggerDocument = getFile('assets/docs/APIdocs.json')

// Setup Middleware
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
// app.use(basicAuth({ challenge:true, authorizer: Controller.Security.basicAuth, authorizeAsync: true }))

const saveAirportsData = () => saveFile(airportsFileName, airports)

// User Database
mongoose.connect(
  "mongodb://localhost/App",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

// Main App

// Users

app.get('/users', Controller.REST.getUsers)

app.post('/users', Controller.REST.postUsers)

app.get('/user/:username', Controller.REST.getUser)

app.patch('/user/:username', Controller.REST.patchUser)

//Airports

// GET - All Airports
app.get('/airports', (req, res) => Controller.REST.getAirports(req, res, { airports }));

// POST - Add New Airport
app.post("/airports", (req, res) => Controller.REST.postAirports(req, res, { airports, saveAirportsData }));

// GET - A Single Airport
app.get('/airport/:icao', (req, res) => Controller.REST.getAirport(req, res, { airports }));

// PUT - Replace an Aiport's Data
app.put('/airport/:icao', (req, res) => Controller.REST.putAirport(req, res, { airports, saveAirportsData }));

// PATCH - Updates an Aiport's Data
app.patch('/airport/:icao', (req, res) => Controller.REST.patchAirport(req, res, { airports, saveAirportsData }));

// DELETE - Delete an Airport
app.delete('/airport/:icao', (req, res) => Controller.REST.deleteAirport(req, res, { airports, saveAirportsData }));

export default app 
