const isdev = false

// Express
import express from 'express';
import bodyParser from 'body-parser'
import basicAuth from 'express-basic-auth'
import session from 'express-session'
import swaggerUi from 'swagger-ui-express'
const app = express();

// Express Sessions
const sessionSettings = {
  secret: "best cohort ever",
  resave: false,
  saveUninitialized: true
}

// Database
import mongoose from "mongoose"

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
app.use(bodyParser.json());
app.use(session(sessionSettings))

app.use('/login', basicAuth({ challenge: true, authorizer: Controller.Security.basicAuth, authorizeAsync: true }))
app.use(Controller.Security.counterSecurity.counterMiddleware)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));


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

app.get('/', (req, res) => res.redirect('/docs'));

// Login and Logout 

app.get('/login', Controller.Security.counterSecurity.counterLogin)

app.get('/logout', Controller.Security.counterSecurity.counterLogout)

// Counter

app.get('/counter', Controller.Security.counterSecurity.getCounter)

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
