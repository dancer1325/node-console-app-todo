require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas");

// This function could be named as you whish
const main = async() => {
    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        // cargar tareas dentro de la clase tareas_listado
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        // Imprimir el menú, waiting for the option introduced in the command line
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                // crear opcion
                const desc = await leerInput("Descripción:"); // Description of the new task to create inserted by the user in the console
                tareas.crearTarea(desc);
                break;

            case "2":
                tareas.listadoCompleto(); // Show in the console all the tasks
                break;

            case "3": // listar completadas
                tareas.listarPendientesCompletadas(true);
                break;

            case "4": // listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case "5": // completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case "6": // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== "0") {
                    const ok = await confirmar("¿Está seguro?");
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada");
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr); // Store after each step, the new record of the tasks

        await pausa(); // Not clean the console directly, once you have selected some option != 0
    } while (opt !== "0");

    // pausa();
};

main();