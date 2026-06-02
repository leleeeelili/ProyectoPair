const UserStory = require('../src/UserStory');
const CriterioDeAceptacion = require('../src/CriterioDeAceptacion');
const Tarea = require('../src/Tarea');
const Desarrollador = require('../src/Desarrollador');

describe('CA-3: Completado de User Story', () => {

test('una User Story no puede marcarse como completada si tiene criterios pendientes', () => {
    const userStory = new UserStory('Registrar avance');
    const criterio = new CriterioDeAceptacion('Validar formulario');

    userStory.agregarCriterio(criterio);

    expect(userStory.verificarCompletada()).toBe(false);
});

test('una User Story puede marcarse como completada cuando todos sus criterios están resueltos', () => {

    const userStory = new UserStory('Registrar avance');

    const criterio = new CriterioDeAceptacion('Validar formulario');

    const tarea = new Tarea('Revisar campos obligatorios');

    const dev1 = new Desarrollador('d1', 'Ana');
    const dev2 = new Desarrollador('d2', 'Pedro');

    tarea.asignarDesarrollador(dev1);
    tarea.asignarDesarrollador(dev2);

    criterio.agregarTarea(tarea);

    tarea.marcarCompletada(dev2);

    userStory.agregarCriterio(criterio);

    expect(userStory.verificarCompletada()).toBe(true);

});

});