/**
 * @typedef EstudianteError
 * @property {string} message.required - Mensaje del error - eg: 'El estudiante no se puede actualizar ya que no existe.'
 */
const EstudianteError = function(message) {
    this.constructor.prototype.__proto__ = Error.prototype
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message
}

module.exports = EstudianteError