require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const userStoryRoutes =
    require('./routes/userStoryRoutes');

app.use(
    '/api/userstories',
    userStoryRoutes
);

app.get('/', (req, res) => {

    res.json({
        mensaje: 'XP Story Library API funcionando'
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor iniciado en puerto ${PORT}`
    );

});