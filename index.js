const express = require('express')
var estudiante = require('./app/infraestructure/route/estudianteController');

const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/estudiante', estudiante);
  
app.get('/', (_, res) => {
    res.redirect('/estudiante');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
  