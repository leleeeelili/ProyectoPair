class Tarea {
    constructor(descripcion) {
        this.descripcion = descripcion;
        this.estado = 'PENDIENTE';
        this.desarrolladores = [];
    }

    esValida() {
        return this.descripcion.trim() !== '';
    }

    asignarDesarrollador(desarrollador) {

        if (this.desarrolladores.length >= 2) {
            throw new Error(
                'Una tarea solo puede tener dos desarrolladores'
            );
        }

        this.desarrolladores.push(desarrollador);
    }

    marcarCompletada(desarrollador = null) {
        this.estado = 'COMPLETADA';
    }
}

module.exports = Tarea;