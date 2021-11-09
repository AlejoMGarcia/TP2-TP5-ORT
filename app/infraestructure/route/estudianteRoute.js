var express = require('express');
const { getEstudiantes, getEstudiantePorDni, crearEstudiante, getEstudiantesPorRangoEdad, eliminarEstudiante, actualizarEstudiante } = require('../controller/estudianteController')
var router = express.Router();

router.get('', getEstudiantes)

router.get('/dni/:dni', getEstudiantePorDni)

router.get('/edad/desde/:rangoDesde/hasta/:rangoHasta', getEstudiantesPorRangoEdad)

router.post('', crearEstudiante)

router.delete('/id/:id', eliminarEstudiante)

router.put('', actualizarEstudiante)

module.exports = router;