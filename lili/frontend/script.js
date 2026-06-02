const biblioteca =
    document.getElementById('biblioteca');

async function cargarHistorias() {

    const respuesta =
        await fetch(
            'http://localhost:3000/api/userstories'
        );

    const historias =
        await respuesta.json();

    historias.forEach(historia => {

        biblioteca.innerHTML += `
        
        <div
            class="libro"
            onclick="abrirHistoria(${historia.id})"
        >

            <h2>📖 US-${historia.id}</h2>

            <p>${historia.titulo}</p>

            <span class="estado">
                ${historia.estado}
            </span>

        </div>

        `;
    });
}

async function completarTarea(id) {

    await fetch(
        `http://localhost:3000/api/userstories/tarea/${id}/completar`,
        {
            method: 'PATCH'
        }
    );

    alert('Tarea completada');

    location.reload();

}

async function abrirHistoria(id) {

    const respuesta =
        await fetch(
            `http://localhost:3000/api/userstories/${id}`
        );

    const datos =
        await respuesta.json();

    const criterios =
        datos.criterios
            .map(c => `<li>${c.descripcion}</li>`)
            .join('');

    const tareas =
    datos.tareas
        .map(t => `

            <li class="tarea-item">

                <span>
                    ${t.descripcion}
                </span>

                ${
                    t.estado !== 'completada'
                    ? `
                        <button
                            onclick="completarTarea(${t.id})"
                        >
                            Completar
                        </button>
                    `
                    : ''
                }

            </li>

        `)
        .join('');

    const desarrolladores =
        datos.desarrolladores
            .map(d => `<li>${d.nombre}</li>`)
            .join('');

    biblioteca.innerHTML = `

        <button
            onclick="location.reload()"
            class="volver"
        >
            ← Volver
        </button>

        <div class="detalle">

            <h1>
                📖 ${datos.historia.titulo}
            </h1>

            <p>
                Estado:
                ${datos.historia.estado}
            </p>

            <h3>
                Criterios de aceptación
            </h3>

            <ul>
                ${criterios}
            </ul>

            <h3>
                Tareas
            </h3>

            <ul>
                ${tareas}
            </ul>

            <h3>
                Pair Programming
            </h3>

            <ul>
                ${desarrolladores}
            </ul>

        </div>

    `;
}

cargarHistorias();