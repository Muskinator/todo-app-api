require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const { init } = require('./src/services/db')

// Définition du port
const port = 3000

// Creation de l'application express
const app = express()

// Installation du middlewares de sécurité
app.use(helmet())
app.use(cors())

// Middlewares de décodages des requêtes
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Middlewares de log
app.use(morgan())

// Connection à la base de données
init()

// Route "/"
app.get('/', (req, res) => {
  res.send('COUCOU')
})

app.use('/todos', require('./src/routes/todos'))
app.use('/auth', require('./src/routes/auth'))
// Lancement de l'API
app.listen(port, () => {
  console.log('server is listening on port : ' + port)
})
