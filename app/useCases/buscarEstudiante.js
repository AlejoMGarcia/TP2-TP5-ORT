const obtenerEstudiantesRepository = require('./../infraestructure/estudianteInMemoryRepository').obtenerEstudiantesRepository
const buscarEstudiantePorDniRepository = require('./../infraestructure/estudianteInMemoryRepository').buscarEstudiantePorDniRepository
const EstudianteError = require('./../domain/EstudianteError');

const buscarEstudiantesPorDni = (dni) => {
    if(!dni)
        throw new EstudianteError('El dni es obligatorio para esta operación.')

    return buscarEstudiantePorDniRepository(dni);
}

const buscarEstudiantesPorRangoEdad = (rangoDesde, rangoHasta) => {
    if(!rangoDesde || !rangoHasta)
        throw new EstudianteError('Los rangos desde y hasta son obligatorios para esta operación.')

    let listaEstudiantes = obtenerEstudiantesRepository();
    return listaEstudiantes.filter((estudiante) => {
        return rangoDesde <= estudiante.edad && estudiante.edad <= rangoHasta
    })
}

module.exports = { buscarEstudiantesPorDni, buscarEstudiantesPorRangoEdad };