const express = require('express');

const router = express.Router();

const {
    obtenerHistorias,
    obtenerHistoriaDetalle,
    completarTarea
} = require('../controllers/userStoryController');

router.get('/', obtenerHistorias);

router.patch(
    '/tarea/:id/completar',
    completarTarea
);

router.get('/:id', obtenerHistoriaDetalle);

module.exports = router;