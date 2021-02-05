const fs = require('fs');

// Helper Functions
function saveFile(filename, data) {
    fs.writeFile(filename, JSON.stringify(data, null, "\t"), function writeJSON(err) {
      if (err) return console.log(err);
      console.log('writing to ' + filename);
    });
  }

export default saveFile