const obtenerEstudiantesRepository = require('./../infraestructure/estudianteInMemoryRepository').obtenerEstudiantesRepository

const obtenerEstudiantesRegistrados = () => {
    return obtenerEstudiantesRepository();
}

module.exports = obtenerEstudiantesRegistrados;