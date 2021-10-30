/**
 * Toda esta clase debería ser la implementación una interfaz  
 * que se encuentre en la carpeta de domain pero no estoy seguro
 * si esto es correcto y como se podría hacer con node js 
 */

const inMemoryEstudiantes = [
    {
        id: "d21ecc37-1435-4c54-803d-1124b1a3273e",
        nombre: "Alejo",
        apellido: "Garcia",
        dni: 37859210,
        edad: 28
    },
    {
        id: "5cf240b2-a281-400f-a231-e5f6510a7174",
        nombre: "Matias",
        apellido: "Carabajal",
        dni: 35249830,
        edad: 25
    }
]

const obtenerEstudiantesRepository = () => {
    return inMemoryEstudiantes
}

const buscarEstudiantePorDniRepository = (dniBuscado) => {
    console.log(`buscando estudiante por dni ${dniBuscado}`)

    return inMemoryEstudiantes.find((estudiante) => {
        return estudiante.dni == dniBuscado
    })
}

const buscarEstudiantePorIdRepository = (idBuscado) => {
    console.log(`buscando estudiante por id ${idBuscado}`)

    return inMemoryEstudiantes.find((estudiante) => {
        return estudiante.id == idBuscado
    })
}

const agregarEstudianteRepository = (estudiante) => {
    inMemoryEstudiantes.push(estudiante)
    console.log(inMemoryEstudiantes)

    return estudiante
}


const eliminarEstudianteRepository = (estudianteAEliminar) => {
    console.log(`Se eliminara el estudiante ${JSON.stringify(estudianteAEliminar)}`)

    const indexEstudianteAEliminar = inMemoryEstudiantes.indexOf(estudianteAEliminar)
    inMemoryEstudiantes.splice(indexEstudianteAEliminar, 1)

    return estudianteAEliminar
}

const actualizarEstudianteRepository = (estudianteAActualizar, estudianteActualizado) => {
    console.log(`Se actualizara el estudiante ${JSON.stringify(estudianteAActualizar)} con la siguiente información  ${JSON.stringify(estudianteActualizado)}`)

    const indexEstudianteAActualizar = inMemoryEstudiantes.indexOf(estudianteAActualizar)
    inMemoryEstudiantes.splice(indexEstudianteAActualizar, 1, estudianteActualizado)

    return estudianteActualizado
}

module.exports = { obtenerEstudiantesRepository, buscarEstudiantePorDniRepository, agregarEstudianteRepository, 
    eliminarEstudianteRepository, buscarEstudiantePorIdRepository, actualizarEstudianteRepository }