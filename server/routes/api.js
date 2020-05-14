const express = require('express')
const router = express.Router()
const request = require('axios')

const City = require('../models/City')

router.get('/city/:cityName', async function (req, res) {
  const city = req.params.cityName.toLocaleLowerCase()
  const data = await request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d98539d8bfaec863c4dbb2f0d8f3dc40&units=metric`)
    .catch(function (err) {
      console.error(err)
    })

  if (!data) {
    res.status(404).end()
    return
  }
  
  const results = data.data
  const weatherInCity = {
    name: results.name,
    country: results.sys.country,
    condition: results.weather[0].description,
    temperature: Math.floor(results.main.temp),
    conditionPic: results.weather[0].icon
  }
  res.send(weatherInCity)
})

router.get('/cities', async function (req, res) {
  const cities = await City.find({})
  res.send(cities)
})

router.post('/city', function (req, res) {
  const newCity = req.body
  const c = new City(
    {
      name: newCity.name,
      temperature: newCity.temperature,
      condition: newCity.condition,
      conditionPic: newCity.conditionPic
    }
  )
  c.save()
    .then(function (city) {
      res.send(city)
    })
})

router.delete('/city/:cityName', async function (req, res) {
  const name = req.params.cityName
  City.deleteOne({ name: name }, function (name) {
    console.log(name, "remover from data")
  }).then(function () {
    res.send("apocalypse!")
  })
})






module.exports = router