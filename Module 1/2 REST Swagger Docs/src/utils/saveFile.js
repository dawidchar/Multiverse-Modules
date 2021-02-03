const fs = require('fs');

// Helper Functions
function saveAirportsData() {
    fs.writeFile(airportsFileName, JSON.stringify(airports, null, "\t"), function writeJSON(err) {
      if (err) return console.log(err);
      console.log('writing to ' + airportsFileName);
    });
  }

export default saveAirportsData