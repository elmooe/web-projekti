const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Restaurant = require('./models/beer.js')

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

//kaikki ravintolat
app.get('/api/restaurants', (request, response) => {
  Restaurant.find({}).then(restaurants => {
    response.json(restaurants)
  })
})

//kaikki tietyn ravintolan oluet
app.get('/api/restaurants/:id/beers', (request, response) => {
  const { id } = request.params

  Restaurant.findById(id)
    .then((restaurant) => {
      if (!restaurant) {
        return response.status(404).json({ error: 'Ravintolaa ei löydy' })
      }
      const beers = restaurant.beers
      response.json(beers)
    })
    .catch(error => response.status(500).json({ error: error.message }))
})


//uusi ravintola ilman oluita
app.post('/api/restaurants', (request, response, next) => {
    const body = request.body
  
    const newRestaurant = new Restaurant({
      name: body.name,
      address: body.address,
      beers: []
    })

    newRestaurant.save()
      .then(savedRestaurant => {
        response.json(savedRestaurant)
    }).catch(error => next(error))
})


//uusi olut ravintolalle ravintolan id:n avulla
app.post('/api/restaurants/:id/beers', (req, res) => {
  const { id } = req.params
  const { name, type, brewery, percentage, hopness } = req.body

  Restaurant.findById(id)
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ error: 'Ravintolaa ei löydy' })
      }

      const newBeer = {
        name: name,
        type: type,
        brewery: brewery,
        percentage: percentage,
        hopness: hopness,
      }
      
      restaurant.beers.push(newBeer)

      restaurant.save()
        .then(() => {
          res.json({ message: 'Olut lisätty ravintolan olutlistaan' })
        })
        .catch(error => res.status(500).json({ error: error.message }))
    })
    .catch(error => res.status(500).json({ error: error.message }))
})

//kaikista ravintoloista kaikki oluet
app.get('/api/restaurants/beers', (request, response) => {
  Restaurant.find({})
    .then((restaurants) => {
      if (!restaurants) {
        return response.status(404).json({ error: 'Ravintoloita ei löydy' })
      }
      const beers = restaurants.map(restaurant => restaurant.beers)
      response.json(beers)
    })
    .catch(error => response.status(500).json({ error: error.message }))
})


app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})