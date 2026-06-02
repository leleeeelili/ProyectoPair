const Tarea = require('../src/Tarea');
const Desarrollador = require('../src/Desarrollador');

describe('CA-2: Completado independiente de tareas', () => {

    test('cualquier integrante del pair puede marcar una tarea como completada', () => {

        const tarea = new Tarea('Revisar campos obligatorios');

        const dev1 = new Desarrollador('d1', 'Ana');
        const dev2 = new Desarrollador('d2', 'Pedro');

        tarea.asignarDesarrollador(dev1);
        tarea.asignarDesarrollador(dev2);

        tarea.marcarCompletada(dev2);

        expect(tarea.estado).toBe('COMPLETADA');
    });

});

describe('CA-4: Validación de tareas', () => {

    test('una tarea con descripción vacía no es válida', () => {

        const tarea = new Tarea('');

        expect(tarea.esValida()).toBe(false);
    });

    test('una tarea con descripción válida es aceptada', () => {

        const tarea = new Tarea('Revisar campos obligatorios');

        expect(tarea.esValida()).toBe(true);
    });

});