class UserStory {
    constructor(titulo) {
        this.titulo = titulo;
        this.estado = 'PENDIENTE';
        this.criterios = [];
    }

    agregarCriterio(criterio) {
        this.criterios.push(criterio);
    }

    verificarCompletada() {

        const completada =
            this.criterios.length > 0 &&
            this.criterios.every(c => c.verificarResuelto());

        this.estado =
            completada ? 'COMPLETADA' : 'PENDIENTE';

        return completada;
    }
}

module.exports = UserStory;