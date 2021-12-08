const fs = require("fs");

const archivo = "./db/data.json";

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data)); // Object --> Json string
    // fs.writeFileSync( archivo, data ); // Not valid, since data must be a buffer not an array
};

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: "utf-8" }); // encoding in order not to return bytes
    const data = JSON.parse(info); // Json --> Object

    // console.log(data);

    return data;
};

module.exports = {
    guardarDB,
    leerDB,
};