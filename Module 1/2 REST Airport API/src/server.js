const isdev = false

// System
import service from './services/default.service'
import saveFile from './utils/saveFile.js'

// Express
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// Airports json
const airportsFileName = isdev ? "./assets/airportstest.json" : "./assets/airports.json"
const airports = require(airportsFileName)

// Swagger components
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./assets/docs/APIdocs.json")

// Setup Middleware
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
const saveAirportsData = () => saveFile(airportsFileName, airports)


// Main App

// GET - All Airports
app.get("/airports", (req, res) => {
  return service.getAirports(req, res, { airports })
});

// POST - Add New Airport
app.post("/airports", (req, res) => {
  return service.postAirports(req, res, { airports, saveAirportsData })
});

// GET - A Single Airport
app.get("/airport/:icao", (req, res) => {
  return service.getAirport(req, res, { airports })
});

// PUT - Replace an Aiport's Data
app.put("/airport/:icao", (req, res) => {
  return service.putAirport(req, res, { airports, saveAirportsData })
});

// PATCH - Updates an Aiport's Data
app.patch("/airport/:icao", (req, res) => {
  return service.patchAirport(req, res, { airports, saveAirportsData })
});

// DELETE - Delete an Airport
app.delete("/airport/:icao", (req, res) => {
  return service.deleteAirport(req, res, { airports, saveAirportsData })
});


module.exports = app;
