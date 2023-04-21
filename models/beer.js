const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

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
  hopness: String,
})

beerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Beer', beerSchema)