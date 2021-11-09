const obtenerEstudiantesRegistrados = require('../../useCases/obtenerEstudiantes')
const crearEstudiante = require('../../useCases/crearEstudiante')
const actualizarEstudiante = require('../../useCases/actualizarEstudiante')
const { buscarEstudiantesPorDni, buscarEstudiantesPorRangoEdad } = require('../../useCases/buscarEstudiante')
const EstudianteError = require('../../domain/EstudianteError')
const eliminarEstudiante = require('../../useCases/eliminarEstudiante');
const Estudiante = require('../../domain/Estudiante')

/**
 * @route GET /estudiante
 * @group Obtener estudiantes registrados - Operacion que devuelve todos los estudiantes registrados
 * @produces application/json
 * @returns {Array.<Estudiante>} 200 - Un array con la lista de estudiantes registrados
 * @returns {Error}  500 - Error inesperado
 */
exports.getEstudiantes = (_, res) => {
    console.log('Consultando lista de estudiantes.')
    const estudiantesRegistrados = obtenerEstudiantesRegistrados()
    res.status(200).json(estudiantesRegistrados)
}

/**
 * @route GET /estudiante/dni/:dni
 * @group Obtener estudiante por dni - Operacion para buscar un estudiante por dni
 * @param {string} dni.params.required - DNI por el cual se realizará la búsqueda 
 * @produces application/json
 * @returns {Estudiante.model} 200 -Estudiante registrado con el dni pasado por parametro
 * @returns {EstudianteError.model}  409 - El parámetro dni es obligatorio para esta operación
 * @returns {Error}  500 - Error inesperado
 */
exports.getEstudiantePorDni = (req, res) => {
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
  }

/**
 * @route GET /estudiante/edad/desde/:rangoDesde/hasta/:rangoHasta
 * @group Obtener estudiantes en rango de edad - Operacion para buscar estudiantes que se encuentren en un determinado rango de edad
 * @param {string} rangoDesde.params.required - Rango desde por el cual se realizará la búsqueda 
 * @param {string} rangoHasta.rangoHasta.required - Rango hasta por el cual se realizará la búsqueda  
 * @produces application/json
 * @returns {Array.<Estudiante>} 200 - Un array con la lista de estudiantes que se encuentran en el rango de edad pasado por parámetro
 * @returns {EstudianteError.model} 409 - Los rangos desde y hasta son obligatorios para esta operación
 * @returns {Error}  500 - Error inesperado
 */
exports.getEstudiantesPorRangoEdad = (req, res) => {
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
  }

/**
 * @route POST /estudiante
 * @group Crear estudiante - Operacion para crear un nuevo estudiante
 * @consumes application/json
 * @param {Estudiante.model} estudiante.body.required - Estudiante a ser creado
 * @produces application/json  
 * @returns {Estudiante.model} 200 - Estudiante creado con la inforación autogenerada
 * @returns {EstudianteError.model}  409 - El estudiante ya se encontraba creado.
 * @returns {Error}  500 - Error inesperado
 */
exports.crearEstudiante = (req, res) => {
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
  }


/**
 * @route DELETE /estudiante
 * @group Eliminar estudiante - Operacion para eliminar un estudiante buscandolo por su id
 * @param {string} id.params.required - Id del estudiante a eliminar  
 * @produces application/json
 * @returns {Estudiante.model} 200 - El estudiante eliminado
 * @returns {EstudianteError.model}  409 - El estudiante no se puede borrar ya que no existe.
 * @returns {Error}  500 - Error inesperado
 */
 exports.eliminarEstudiante = (req, res) => {
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
  
  }

/**
 * @route PUT /estudiante
 * @group Actualizar estudiante - Operacion para actualizar un estudiante
 * @consumes application/json
 * @param {Estudiante.model} estudiante.body.required - Estudiante a ser actualizado
 * @produces application/json  
 * @returns {Estudiante.model} 200 - Estudiante actualizado con la inforación guardada
 * @returns {EstudianteError.model}  409 - El estudiante no se puede actualizar ya que no existe
 * @returns {Error}  500 - Error inesperado
 */
exports.actualizarEstudiante = (req, res) => {
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
}