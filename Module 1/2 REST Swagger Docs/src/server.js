// System
const fs = require('fs');
const isdev = true

//Express
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// our airports json
const airportsFileName = isdev ? "../assets/airportstest.json" : "../assets/airports.json"
const airports = isdev ? require(airportsFileName) : require(airportsFileName);

// swagger components
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../assets/docs/APIdocs.json")

// Setup Express Middleware
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));


// Main App

function saveAirportsData() {
  fs.writeFile(airportsFileName, JSON.stringify(airports, null, "\t"), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing to ' + airportsFileName);
  });
}

// GET - All Airports
app.get("/airports", (req, res) => {
  res.send(airports);
});

// POST - Add New Airport
app.post("/airports", (req, res) => {
  airports.push(req.body)
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
    return res.status(404).send('Airport Not found');
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
    return res.status(404).send('Airport Not found');
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
    return res.status(404).send('Airport Not found');
  }

  res.send('Deleted Airport')
});


module.exports = app;
