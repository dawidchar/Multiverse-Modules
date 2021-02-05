// Vars
const isdev = false
const perPageCount = 25

// System
const saveAirportsData = require('./utils/saveFile.js')

//Express
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// our airports json
const airportsFileName = isdev ? "./assets/airportstest.json" : "./assets/airports.json"
const airports = isdev ? require(airportsFileName) : require(airportsFileName);

// swagger components
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./assets/docs/APIdocs.json")

// Setup Express Middleware
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));


// Main App

// GET - All Airports
app.get("/airports", (req, res) => {
  if (req.query.all != 'true') {
    const pageSize = !isNaN(req.query.pagesize) ? parseInt(req.query.pagesize) : perPageCount
    const startIndex = (!isNaN(req.query.page) ? parseInt(req.query.page) : 0) * pageSize
    res.send(airports.slice(startIndex, startIndex + pageSize));
  } else {
    res.send(airports);
  }
});

// POST - Add New Airport
app.post("/airports", (req, res) => {
  airports.unshift(req.body)
  saveAirportsData()
  res.send()
});

// GET - A Single Airport
app.get("/airport/:icao", (req, res) => {
  const airport = airports.find(airport => airport.icao === req.params.icao)
  console.log(`Found ${airport}`)
  res.send(airport);
});

// PUT - Replace an Aiport's Data
app.put("/airport/:icao", (req, res) => {
  const airportIndex = airports.findIndex(airport => airport.icao === req.params.icao)
  const originalAirportICAO = airports[airportIndex].icao

  if (airportIndex > -1) {
    console.log(`Replacing ${airports[airportIndex].name}`)
    airports[airportIndex] = req.body
    saveAirportsData()
  } else {
    return res.status(204).send('Airport Not found');
  }

  res.send(`Replaced Airport Data ${originalAirportICAO} --> ${airports[airportIndex].icao}`);
});

// PATCH - Updates an Aiport's Data
app.patch("/airport/:icao", (req, res) => {
  const airportIndex = airports.findIndex(airport => airport.icao === req.params.icao)

  if (airportIndex > -1) {
    console.log(`Updating ${airports[airportIndex].name}`)
    airports[airportIndex] = Object.assign(airports[airportIndex], req.body)
    console.log(`Updated To ${JSON.stringify(airports[airportIndex], null, '\t')}`)
    saveAirportsData()
  } else {
    return res.status(204).send('Airport Not found');
  }

  res.send(`Updated Airport Data`);
});

// DELETE - Delete an Airport
app.delete("/airport/:icao", (req, res) => {
  const airportIndex = airports.findIndex(airport => airport.icao === req.params.icao)

  if (airportIndex > -1) {
    airports.splice(airportIndex, 1);
    saveAirportsData()
  } else {
    return res.status(204).send('Airport Not found');
  }

  res.send('Deleted Airport')
});


module.exports = app;
