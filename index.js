const express = require('express')
var estudiante = require('./app/infraestructure/route/estudianteRoute');
const app = express()
const expressSwagger = require('express-swagger-generator')(app);

const port = 3000

let options = {
    swaggerDefinition: {
        info: {
            description: 'Servidor para TP de Taller de Programación 2 - ORT',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json"
        ],
        schemes: ['http']
    },
    basedir: __dirname, //app absolute path
    files: ['./app/infraestructure/controller/*.js', './app/domain/*.js'] //Path to the API handle folder
};
expressSwagger(options)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/estudiante', estudiante);
  
app.get('/', (_, res) => {
    res.redirect('/api-docs');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
  