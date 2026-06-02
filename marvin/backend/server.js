const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Conexión a Neon
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_qVXjxEC34Fpb@ep-floral-cherry-apvn1i8i-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
});

// GET desarrolladores
app.get('/api/desarrolladores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM desarrolladores');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET historias
app.get('/api/historias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM historias_de_usuario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST guardar estimación
app.post('/api/historias/:id/estimar', async (req, res) => {
  const { id } = req.params;
  const { puntos_esfuerzo, nota_tecnica, desarrollador_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE historias_de_usuario 
       SET puntos_esfuerzo = $1, nota_tecnica = $2, desarrollador_id = $3, estado = 'estimada'
       WHERE id = $4 RETURNING *`,
      [puntos_esfuerzo, nota_tecnica, desarrollador_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});