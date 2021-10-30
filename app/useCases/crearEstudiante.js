const buscarEstudiantePorDniRepository = require('./../infraestructure/estudianteInMemoryRepository').buscarEstudiantePorDniRepository
const agregarEstudianteRepository = require('./../infraestructure/estudianteInMemoryRepository').agregarEstudianteRepository
const Estudiante = require('../domain/Estudiante')
const EstudianteError = require('../domain/EstudianteError')

const crearEstudiante = (estudianteDTO) => {
    console.log(`Creando estudiante ${JSON.stringify(estudianteDTO)}`)
    let estudianteToSave
    const existe = buscarEstudiantePorDniRepository(estudianteDTO.dni)
    if (!existe) {
        console.info('No existe, se procedera a crearlo.')
        
        try {
            estudianteToSave = Estudiante.fromDto(estudianteDTO)
        } catch (error) {
            throw error
        }
    
        return agregarEstudianteRepository(estudianteToSave)
    } else {
        console.error('El estudiante ya estaba creado.')
        throw new EstudianteError('El estudiante ya esta creado.')
    }
}

module.exports = crearEstudiante;