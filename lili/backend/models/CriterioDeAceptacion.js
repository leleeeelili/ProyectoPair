class CriterioDeAceptacion {
    constructor(descripcion) {
        this.descripcion = descripcion;
        this.estado = 'PENDIENTE';
        this.tareas = [];
    }

    agregarTarea(tarea) {
        this.tareas.push(tarea);
    }

    tieneAlMenosUnaTarea() {
        return this.tareas.length > 0;
    }

    verificarResuelto() {

        const resuelto =
            this.tareas.length > 0 &&
            this.tareas.every(
                tarea => tarea.estado === 'COMPLETADA'
            );

        this.estado =
            resuelto ? 'RESUELTO' : 'PENDIENTE';

        return resuelto;
    }
}

module.exports = CriterioDeAceptacion;