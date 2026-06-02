const pool = require('../config/db');

const obtenerHistorias = async (req, res) => {

    try {

        const resultado = await pool.query(`
            SELECT
                id,
                titulo,
                estado
            FROM historias_de_usuario
            ORDER BY id
        `);

        res.json(resultado.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener historias'
        });

    }

};

const obtenerHistoriaDetalle = async (req, res) => {

    try {

        const { id } = req.params;

        const historia = await pool.query(`
            SELECT *
            FROM historias_de_usuario
            WHERE id = $1
        `, [id]);

        const criterios = await pool.query(`
            SELECT *
            FROM criterios_aceptacion
            WHERE historia_id = $1
            ORDER BY id
        `, [id]);

        const tareas = await pool.query(`
            SELECT
                t.*
            FROM tareas t
            INNER JOIN criterios_aceptacion c
                ON t.criterio_id = c.id
            WHERE c.historia_id = $1
            ORDER BY t.id
        `, [id]);

        const desarrolladores = await pool.query(`
            SELECT DISTINCT
                d.id,
                d.nombre,
                d.rol
            FROM desarrolladores d
            INNER JOIN tarea_desarrollador td
                ON d.id = td.desarrollador_id
            INNER JOIN tareas t
                ON td.tarea_id = t.id
            INNER JOIN criterios_aceptacion c
                ON t.criterio_id = c.id
            WHERE c.historia_id = $1
        `, [id]);

        res.json({
            historia: historia.rows[0],
            criterios: criterios.rows,
            tareas: tareas.rows,
            desarrolladores: desarrolladores.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener detalle'
        });

    }

};

const completarTarea = async (req, res) => {

    try {

        const { id } = req.params;

        // Completar tarea

        await pool.query(`
            UPDATE tareas
            SET estado = 'completada'
            WHERE id = $1
        `, [id]);

        // Obtener criterio

        const tarea = await pool.query(`
            SELECT *
            FROM tareas
            WHERE id = $1
        `, [id]);

        const criterioId =
            tarea.rows[0].criterio_id;

        // Verificar tareas pendientes

        const tareasPendientes =
            await pool.query(`
                SELECT *
                FROM tareas
                WHERE criterio_id = $1
                AND estado <> 'completada'
            `, [criterioId]);

        // Si no quedan tareas

        if (
            tareasPendientes.rows.length === 0
        ) {

            await pool.query(`
                UPDATE criterios_aceptacion
                SET estado = 'resuelto'
                WHERE id = $1
            `, [criterioId]);

            // Obtener historia

            const criterio =
                await pool.query(`
                    SELECT *
                    FROM criterios_aceptacion
                    WHERE id = $1
                `, [criterioId]);

            const historiaId =
                criterio.rows[0].historia_id;

            // Verificar criterios pendientes

            const criteriosPendientes =
                await pool.query(`
                    SELECT *
                    FROM criterios_aceptacion
                    WHERE historia_id = $1
                    AND estado <> 'resuelto'
                `, [historiaId]);

            // Si no quedan criterios

            if (
                criteriosPendientes.rows.length === 0
            ) {

                await pool.query(`
                    UPDATE historias_de_usuario
                    SET estado = 'completada'
                    WHERE id = $1
                `, [historiaId]);

            }

        }

        res.json({
            mensaje: 'Tarea completada'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error'
        });

    }

};

module.exports = {
    obtenerHistorias,
    obtenerHistoriaDetalle,
    completarTarea
};