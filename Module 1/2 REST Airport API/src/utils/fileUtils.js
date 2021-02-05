const fs = require('fs');


function getFile(file) {
    return require(`../${file}`)
}

function saveFile(filename, data) {
    fs.writeFile(filename, JSON.stringify(data, null, "\t"), function writeJSON(err) {
        if (err) return console.error(err);
    });
}

const fileUtils = { saveFile, getFile }

export default fileUtils