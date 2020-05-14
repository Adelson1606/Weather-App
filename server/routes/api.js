const express = require('express')
const router = express.Router()
const request = require('axios')

const City = require('../models/City')

function apireq (city) {
  return request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d98539d8bfaec863c4dbb2f0d8f3dc40&units=metric`)
}

router.get('/city/:cityName', async function (req, res) {
  const city = req.params.cityName
  const name = city.charAt(0).toUpperCase() + city.slice(1)
  const data = await apireq(name)
    .catch(function (err) {
      console.error(err)
    })

  if (!data) {
    res.status(404).end()
    return
  }
  
  const results = data.data
  const weatherInCity = {
    coord: {
      lon: results.coord.lon,
      lat: results.coord.lat
    },
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
      coord: {
        lon: newCity['coord[lon]'],
        lat: newCity['coord[lat]']
      },
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
  const city = req.params.cityName
  const name = city.charAt(0).toUpperCase() + city.slice(1)
  City.deleteOne({ name: name }, () => {
    console.log(name, "remover from data")
  }).then(function () {
    res.send("apocalypse!")
  })
})

router.put('/city/:cityName', async function (req, res) {
  const city = req.params.cityName
  const name = city.charAt(0).toUpperCase() + city.slice(1)
  const data = await apireq(name)
  const filter = { name: name }
  const update = { 
    condition: data.data.weather[0].description,
    temperature: Math.floor(data.data.main.temp),
    conditionPic: data.data.weather[0].icon 
  }
  const updated = await City.findOneAndUpdate(filter, update, { new: true }) 
  res.send(updated)
})






module.exports = router