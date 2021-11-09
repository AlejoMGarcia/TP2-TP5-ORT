const { v4: uuidv4 } = require('uuid');
const EstudianteError = require('./EstudianteError');

const validarEdad = (edad) => {
    if(!edad)
        throw new EstudianteError('La edad no puede estar vacia') 
}

const validarNombre = (nombre) => {
    if(!nombre)
        throw new EstudianteError('El nombre no puede estar vacia') 
}

const validarApellido = (apellido) => {
    if(!apellido)
        throw new EstudianteError('El apellido no puede estar vacia') 
}

const validarDocumento = (documento) => {
    if(!documento)
        throw new EstudianteError('El apellido no puede estar vacia') 
}

/**
 * @typedef Estudiante
 * @property {string} id - Id autogenerado - eg: 1234
 * @property {string} nombre.required - Nombre del estudiante - eg: Alejo
 * @property {string} apellido.required - Apellido del estudiante - eg: Garcia
 * @property {string} mombreCompleto - Nombre completo autogenerado - eg: Alejo Garcia
 * @property {string} dni.required - DNI del estudiante - eg: 35937384
 * @property {string} edad.required - Edad del estudiante - eg: 35
 */
const Estudiante = function(nombre, apellido, dni, edad) {
    this.id = uuidv4(),
    this.nombre = nombre,
    this.apellido = apellido,
    this.mombreCompleto = `${apellido}, ${nombre}`,
    this.dni = dni,
    this.edad = edad
}

Estudiante.fromDto = (estudianteDto) => {

    validarEdad(estudianteDto.edad)
    validarNombre(estudianteDto.nombre)
    validarApellido(estudianteDto.apellido)
    validarDocumento(estudianteDto.dni)

    const estudianteMapeado = new Estudiante( 
        estudianteDto.nombre,
        estudianteDto.apellido,
        estudianteDto.dni,
        estudianteDto.edad
        )
        
    return estudianteMapeado
}

module.exports = Estudiante