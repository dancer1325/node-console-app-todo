const Tarea = require("./tarea");

/** Example
 *  _listado:
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoeEN:92231 }  },
 */

class Tareas {
    // It's an object
    _listado = {
        abc: 123,
    };

    // Get in array way the list
    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea; //Load into _listado with all the elements
        });
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea; // We will add properties into _listado by the uuid
        // Ways of adding a property into an object
        // this._listado.abc = tarea; // 1) .
        // this._listado[abc] = tarea; // 2) []
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea; // Desustructuration to get just some of the necessary properties
            const estado = completadoEn ? "Completada".green : "Pendiente".red;

            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? "Completada".green : "Pendiente".red;
            if (completadas) {
                // mostrar completadas
                if (completadoEn) {
                    contador += 1;
                    console.log(
                        `${(contador + ".").green} ${desc} :: ${completadoEn.green}`
                    );
                }
            } else {
                // mostrar pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id]; // Reference declaration
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString(); // Reference declaration --> It's modified in the _listado's element
            }
        });

        // Those tasks whose id's don't come here -->  They will be completed
        this.listadoArr.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;