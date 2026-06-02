class Desarrollador {
  constructor(nombre, rol) {
    this.nombre = nombre;
    this.rol = rol;
  }
  esDesarrollador() {
    return this.rol === "desarrollador";
  }
}

class HistoriaDeUsuario {
  constructor(titulo) {
    this.titulo = titulo;
    this.puntosEsfuerzo = null;
    this.notaTecnica = null;
  }
  modificarPuntos(dev, puntos) {
    if (dev.esDesarrollador()) {
      this.puntosEsfuerzo = puntos;
    }
  }
}

function test(nombre, funcion) {
  try {
    funcion();
    console.log(`PASSED - ${nombre}`);
  } catch (e) {
    console.log(`FAILED - ${nombre}: ${e.message}`);
  }
}

function assert(condicion) {
  if (!condicion) throw new Error("Asercion fallida");
}

test("test_ingresar_puntos_numericos", () => {
  const historia = new HistoriaDeUsuario("Estimar puntos");
  const dev = new Desarrollador("Marvin", "desarrollador");
  historia.modificarPuntos(dev, 5);
  assert(typeof historia.puntosEsfuerzo === "number");
});

test("test_escribir_nota_tecnica", () => {
  const historia = new HistoriaDeUsuario("Estimar puntos");
  historia.notaTecnica = "Esta tarea es compleja por X razón";
  assert(historia.notaTecnica !== null);
});

test("test_solo_desarrollador_modifica_puntos", () => {
  const historia = new HistoriaDeUsuario("Estimar puntos");
  const noDev = new Desarrollador("Juan", "tester");
  historia.modificarPuntos(noDev, 8);
  assert(historia.puntosEsfuerzo === null);
});