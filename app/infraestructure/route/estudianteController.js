const obtenerEstudiantesRegistrados = require('../../useCases/obtenerEstudiantes')
const crearEstudiante = require('../../useCases/crearEstudiante')
const actualizarEstudiante = require('../../useCases/actualizarEstudiante')
const { buscarEstudiantesPorDni, buscarEstudiantesPorRangoEdad } = require('../../useCases/buscarEstudiante')
const EstudianteError = require('../../domain/EstudianteError')

var express = require('express');
const eliminarEstudiante = require('../../useCases/eliminarEstudiante');
var router = express.Router();

router.get('', (_, res) => {
  console.log('Consultando lista de estudiantes.')
  const estudiantesRegistrados = obtenerEstudiantesRegistrados()
  res.status(200).json(estudiantesRegistrados)
})

router.get('/dni/:dni', (req, res) => {
  const dni = req.params.dni
  console.log(`Se buscara el estudiante con dni: ${dni}`)

  try {
    const estudianteEncontrado = buscarEstudiantesPorDni(dni)
    const respuesta = estudianteEncontrado || 'No se encontró ningún estudiante.';

    res.status(200).json(respuesta)
  } catch (error) {
    let statusError = 500

    if(error instanceof EstudianteError)
      statusError = 409
    
    res.status(statusError).send(error.message)
  }
})

router.get('/edad/desde/:rangoDesde/hasta/:rangoHasta', (req, res) => {
  const rangoDesde = req.params.rangoDesde
  const rangoHasta = req.params.rangoHasta

  console.log(`Se buscara a los estudiantes estudiante que tengan una edad entre ${rangoDesde} y ${rangoHasta}`)

  try {
    const listaEstudiantesEncontrados = buscarEstudiantesPorRangoEdad(rangoDesde, rangoHasta)
    let respuesta
    if(listaEstudiantesEncontrados.length == 0) 
      respuesta = 'No hay estudiante en los rangos de edad seleccionado.';
    else
      respuesta = listaEstudiantesEncontrados

    res.status(200).json(respuesta)
  } catch (error) {
    let statusError = 500

    if(error instanceof EstudianteError)
      statusError = 409
    
    res.status(statusError).send(error.message)
  }
})


router.post('', (req, res) => {
  console.log(`Se guardara el estudiante: ${JSON.stringify(req.body)}`)
  const estudianteDTO = req.body

  try {
    const estudianteCreado = crearEstudiante(estudianteDTO)
    res.status(200).json(estudianteCreado)
  } catch (error) {
    let statusError = 500

    if(error instanceof EstudianteError)
      statusError = 409
    
    res.status(statusError).send(error.message)
  }
})

router.delete('/id/:id', (req, res) => {
  const id = req.params.id
  console.log(`Se eliminara el estudiante con id: ${id}`)

  try {
    const estudianteEncontrado = eliminarEstudiante(id)
    const respuesta = estudianteEncontrado || 'No se encontró ningún estudiante.';

    res.status(200).json(respuesta)
  } catch (error) {
    let statusError = 500

    if(error instanceof EstudianteError)
      statusError = 409
    
    res.status(statusError).send(error.message)
  }

})

router.put('', (req, res) => {
  console.log(`Se guardara el estudiante: ${JSON.stringify(req.body)}`)
  const estudianteDTO = req.body

  try {
    const estudianteActualizado = actualizarEstudiante(estudianteDTO)
    res.status(200).json(estudianteActualizado)
  } catch (error) {
    let statusError = 500

    if(error instanceof EstudianteError)
      statusError = 409
    
    res.status(statusError).send(error.message)
  }
})

module.exports = router;