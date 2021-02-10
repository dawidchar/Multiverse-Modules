const isdev = false

// Express
import express from 'express';
import { auth, requiresAuth } from 'express-openid-connect'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
const app = express();

// Auth Config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'EoGeCRUvxFpBreBj3ZgCm2fZIEEDXiTw',
  issuerBaseURL: 'https://dawid-dev-test.eu.auth0.com'
};


// Utils and services
import Controller from './controllers/default.controller'
import fileUtils from './utils/fileUtils'
const { getFile, saveFile } = fileUtils

// Airports json
const airportsFileName = isdev ? 'assets/airportstest.json' : 'assets/airports.json'
const airports = getFile(airportsFileName)
const saveAirportsData = () => saveFile(airportsFileName, airports)

// Swagger components
const swaggerDocument = getFile('assets/docs/APIdocs.json')

// Setup Middleware
app.use(cors());
app.use(auth(config));
app.use(bodyParser.json());

app.use(Controller.Security.excludePathsFromMiddleware(requiresAuth()))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));


// Main App

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

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
