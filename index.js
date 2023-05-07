const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Restaurant = require('./models/beer.js')

/**
 * Middleware that logs the request method, path, and body to the console.
 * 
 * @function
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @param {function} next - The callback function to call next middleware.
 */
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

/**
 * Middleware that handles errors.
 * 
 * @param {Error} error - The error object.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @param {function} next - The callback function to call next middleware.
 */
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

/**
 * Middleware that handles unkwnown endpoints.
 * 
 * @param {Object} request - The HTTP request object
 * @param {Object} response - The HTTP response object.
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

/**
 * Route that retrieves all restaurants.
 * 
 * @name get/restaurants
 * @function
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 */
app.get('/api/restaurants', (request, response) => {
  Restaurant.find({}).then(restaurants => {
    response.json(restaurants)
  })
})

/**
 * Route that retrieves all beers for a specific restaurant.
 * 
 * @name get/restaurants/:id/beers
 * @function
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 */
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

/**
 * Route that creates a new restaurant.
 * 
 * @name post/restaurants
 * @function
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @param {function} next - The callback function to call next middleware.
 */
app.post('/api/restaurants', (request, response, next) => {
  const body = request.body

  const newRestaurant = new Restaurant({
    name: body.name,
    address: body.address,
    pintIII: body.pintIII,
    pintIV: body.pintIV,
    beers: []
  })

  newRestaurant.save()
    .then(savedRestaurant => {
      response.json(savedRestaurant)
    }).catch(error => next(error))
})

/**
 * Adds a new beer to the restaurant's beer list using the restaurant ID.
 *
 * @param {object} req - Express request object
 * @param {string} req.params.id - ID of the restaurant to add the beer to
 * @param {object} req.body - Beer object to add to the list
 * @param {string} req.body.name - Name of the beer
 * @param {string} req.body.type - Type of the beer
 * @param {string} req.body.brewery - Name of the brewery that makes the beer
 * @param {number} req.body.percentage - Alcohol percentage of the beer
 * @param {number} req.body.price - Price of the beer
 * @param {object} res - Express response object
 */
app.post('/api/restaurants/:id/beers', (req, res) => {
  const { id } = req.params
  const { name, type, brewery, percentage, price } = req.body

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
        price: price,
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

/**
 * Gets all the beers from all the restaurants.
 *
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 */
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

/**
 * Deletes a beer from a restaurant's beer list using the restaurant ID and beer ID.
 *
 * @param {object} request - Express request object
 * @param {string} request.params.restaurantId - ID of the restaurant
 * @param {string} request.params.beerId - ID of the beer to delete
 * @param {object} response - Express response object
 * @param {function} next - Express next middleware function
 */
app.delete('/api/restaurants/:restaurantId/beers/:beerId', (request, response, next) => {
  const { restaurantId, beerId } = request.params

  Restaurant.findById(restaurantId)
    .then((restaurant) => {
      if (!restaurant) {
        next({ error: 'Ravintolaa ei löydy', status: 404 })
      }

      const beerIndex = restaurant.beers.findIndex((beer) => beer.id === beerId)

      if (beerIndex === -1) {
        next({ error: 'Olutta ei löydy', status: 404 })
      }

      restaurant.beers.splice(beerIndex, 1)

      restaurant.save()
        .then(() => {
          response.json({ message: 'Olut poistettu ravintolan olutlistalta' })
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

/**
 * Updates a restaurant's pint III and pint IV details using the restaurant ID.
 *
 * @param {object} req - Express request object
 * @param {string} req.params.id - ID of the restaurant to update
 * @param {object} req.body - Object containing the new pint III and pint IV details
 * @param {number} req.body.pintIII - New pint III details
 * @param {number} req.body.pintIV - New pint IV details
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
app.put('/api/restaurants/:id', (req, res, next) => {
  const { id } = req.params
  const { pintIII, pintIV } = req.body

  Restaurant.findById(id)
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ error: 'Ravintolaa ei löydy' })
      }

      restaurant.pintIII = pintIII || restaurant.pintIII
      restaurant.pintIV = pintIV || restaurant.pintIV

      restaurant.save()
        .then(() => {
          res.json({ message: 'Olut päivitetty' })
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

/**
 * Updates a beer's price using the restaurant ID and beer ID.
 *
 * @param {object} req - Express request object
 * @param {string} req.params.id - ID of the restaurant
 * @param {string} req.params.beerId - ID of the beer to update
 * @param {object} req.body - Object containing the new price of the beer
 * @param {number} req.body.price - New price of the beer
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
app.put('/api/restaurants/:id/beers/:beerId', (req, res, next) => {
  const { id, beerId } = req.params
  const { price } = req.body

  Restaurant.findById(id)
    .then((restaurant) => {
      if (!restaurant) {
        return res.status(404).json({ error: 'Ravintolaa ei löydy' })
      }

      const beerToUpdate = restaurant.beers.find(beer => beer.id === beerId)

      if (!beerToUpdate) {
        return res.status(404).json({ error: 'Olutta ei löydy' })
      }

      beerToUpdate.price = price

      restaurant.save()
        .then(() => {
          res.json({ message: 'Olut päivitetty' })
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})