const mongoose = require('mongoose')
const Schema = mongoose.Schema

const plantSchema = new Schema({
  name: String,
  image: String,
  notes: String,
  season: String
})

const Plant = mongoose.model('Plant', plantSchema)

module.exports = Plant
