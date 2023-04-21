const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Beer = require('./models/beer.js')
const { default: mongoose } = require('mongoose')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
//app.use(express.static('build'))

app.get('/api/beers', (request, response) => {
  Beer.find({}).then(beers => {
    response.json(beers)
  })
})

app.post('/api/beers', (request, response, next) => {
    const body = request.body
  
    const beer = new Beer({
        name: body.name,
        type: body.type,
        brewery: body.brewery,
        percentage: body.percentage,
        hopness: body.hopness,
    })
  
    beer.save()
      .then(savedBeer => {
        response.json(savedBeer)
    }).catch(error => next(error))
})

app.get('/api/beers/:id', (request, response) => {
  Beer.findById(request.params.id).then(beer => {
    response.json(beer)
  })
})

app.put('/api/beers/:id', (request, response, next) => {
    const { name, type, brewery, percentage, hopness } = request.body
  
    Beer.findByIdAndUpdate(
      request.params.id, 
      { name, type, brewery, percentage, hopness },
      { new: true, runValidators: true, context: 'query' }
    ) 
    .then(updatedBeer => {
        response.json(updatedBeer)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})