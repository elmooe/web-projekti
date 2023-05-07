/**
 * A module that defines a mongoose schema for a restaurant and its beer menu
 * 
 * @module restaurantSchema
 * @requires mongoose
 */
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

/**
 * The URL of the MongoDB server to connect to.
 * 
 * @type {string}
*/
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

 /**
 * The schema for a Beer.
 * @typedef {object} BeerSchema
 * @property {string} name - The name of the beer.
 * @property {string} type - The type of the beer.
 * @property {string} brewery - The name of the brewery that produces the beer.
 * @property {string} percentage - The alcohol percentage of the beer.
 * @property {string} price - The price of the beer.
 */
const beerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  type: {
    type: String,
    minlength: 3,
    required: true
  },
  brewery: String,
  percentage: String,
  price: String,
})

/**
 * The schema for a Restaurant.
 * @typedef {object} RestaurantSchema
 * @property {string} name - The name of the restaurant.
 * @property {string} address - The address of the restaurant.
 * @property {string} pintIII - The price of a pint III of beer.
 * @property {string} pintIV - The price of a pint IV of beer.
 * @property {BeerSchema[]} beers - The list of beers offered by the restaurant.
 */
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pintIII:{
    type: String
  },
  pintIV:{
    type: String
  },
  beers: [beerSchema]
})

/**
 * Transform function used to remove "_id" and "__v" fields from Mongoose documents.
 * @callback TransformFunction
 * @param {object} document - The Mongoose document to transform.
 * @param {object} returnedObject - The transformed object to return.
 */
beerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/**
 * Transform function used to remove "_id" and "__v" fields from Mongoose documents.
 * @callback TransformFunction
 * @param {object} document - The Mongoose document to transform.
 * @param {object} returnedObject - The transformed object to return.
 */
restaurantSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)