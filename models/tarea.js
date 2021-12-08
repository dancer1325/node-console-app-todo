const { v4: uudiv4 } = require("uuid"); // nameOfThePackage: alias

// From ES6, JS manages classes
class Tarea {
    id = "";
    desc = ""; // Task description
    completadoEn = null;

    constructor(desc) {
        this.id = uudiv4();
        this.desc = desc;
        this.completadoEn = null; // It would be redundante since it's already specified previously
    }
}

// Without {}, since we only export 1 thing
module.exports = Tarea;