const buscarEstudiantePorIdRepository = require('./../infraestructure/estudianteInMemoryRepository').buscarEstudiantePorIdRepository
const eliminarEstudianteRepository = require('./../infraestructure/estudianteInMemoryRepository').eliminarEstudianteRepository
const EstudianteError = require('../domain/EstudianteError')

const eliminarEstudiante = (id) => {
    console.log(`Se eliminara el estudiante con dni ${id}`)

    const estudianteAEliminar = buscarEstudiantePorIdRepository(id)
    console.log(estudianteAEliminar)
    if (estudianteAEliminar) {
        return eliminarEstudianteRepository(estudianteAEliminar) 
    } else {
        console.error('El estudiante no se puede borrar ya que no existe.')
        throw new EstudianteError('El estudiante no se puede borrar ya que no existe.')
    }
}

module.exports = eliminarEstudiante;