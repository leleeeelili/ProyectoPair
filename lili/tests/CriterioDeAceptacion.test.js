const CriterioDeAceptacion = require('../src/CriterioDeAceptacion');
const Tarea = require('../src/Tarea');
const Desarrollador = require('../src/Desarrollador');

describe('CA-1: Cada criterio debe tener al menos una tarea asociada', () => {

test('un criterio sin tareas no cumple el requisito mínimo', () => {
    const criterio = new CriterioDeAceptacion('Validar formulario');

    expect(criterio.tieneAlMenosUnaTarea()).toBe(false);
});

test('un criterio con una tarea asociada cumple el requisito mínimo', () => {
    const criterio = new CriterioDeAceptacion('Validar formulario');
    const tarea = new Tarea('Revisar campos obligatorios');

    criterio.agregarTarea(tarea);

    expect(criterio.tieneAlMenosUnaTarea()).toBe(true);
});

});

describe('CA-2: Resolución de criterios de aceptación', () => {

test('un criterio no puede resolverse si tiene tareas pendientes', () => {
    const criterio = new CriterioDeAceptacion('Validar formulario');
    const tarea = new Tarea('Revisar campos obligatorios');

    criterio.agregarTarea(tarea);

    expect(criterio.verificarResuelto()).toBe(false);
});

test('un criterio puede resolverse cuando todas sus tareas están completadas', () => {

    const criterio = new CriterioDeAceptacion('Validar formulario');

    const tarea = new Tarea('Revisar campos obligatorios');

    const dev1 = new Desarrollador('d1', 'Ana');
    const dev2 = new Desarrollador('d2', 'Pedro');

    tarea.asignarDesarrollador(dev1);
    tarea.asignarDesarrollador(dev2);

    criterio.agregarTarea(tarea);

    tarea.marcarCompletada(dev1);

    expect(criterio.verificarResuelto()).toBe(true);

});

});