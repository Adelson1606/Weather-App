const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
  coord: {
    lon: Number,
    lat: Number
  },
  name: String,
  temperature: Number,
  condition: String,
  conditionPic: String
})
const City = mongoose.model("cities", citySchema)


module.exports = City

