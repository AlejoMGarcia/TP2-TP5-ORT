const buscarEstudiantePorIdRepository = require('./../infraestructure/estudianteInMemoryRepository').buscarEstudiantePorIdRepository
const actualizarEstudianteRepository = require('./../infraestructure/estudianteInMemoryRepository').actualizarEstudianteRepository
const EstudianteError = require('../domain/EstudianteError')

const actualizarEstudiante = (estudianteActualizado) => {
    console.log(`Se actualizara el estudiante con dni ${estudianteActualizado.id}`)

    const estudianteAActualizar = buscarEstudiantePorIdRepository(estudianteActualizado.id)
    if (estudianteAActualizar) {
        return actualizarEstudianteRepository(estudianteAActualizar, estudianteActualizado) 
    } else {
        console.error('El estudiante no se puede actualizar ya que no existe.')
        throw new EstudianteError('El estudiante no se puede actualizar ya que no existe.')
    }
}

module.exports = actualizarEstudiante;