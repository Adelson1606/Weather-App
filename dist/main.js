const tempMenager = new TempManager()
const renderer = new Renderer()

async function loadPage () {
  await tempMenager.getDataFromDB()
  const allCityData = tempMenager.cityData
  renderer.renderData(allCityData)
}

async function handleSearch (event) {
  const cityInput = $('#city-input').val()

  event.preventDefault()

  $('#city-input').val("") 

  await tempMenager.getCityData(cityInput)
  renderer.renderData(tempMenager.cityData)
}

$('.search').on('submit', handleSearch) 

$('.main-container').on('click', '.save', async function () {
  const cityName = $(this).closest(".city-container").find('.name').text()
  await tempMenager.saveCity(cityName)
  renderer.renderData(tempMenager.cityData)
})

$('.main-container').on('click', '.fa-minus-circle', function () {
  const cityName = $(this).closest(".city-container").find('.name').text()
  tempMenager.removeCity(cityName)
  renderer.renderData(tempMenager.cityData)
})

$('.main-container').on('click', '.fa-sync-alt', function () {
  const cityName = $(this).closest(".city-container").find('.name').text()
  tempMenager.updateCity(cityName)
  renderer.renderData(tempMenager.cityData)
  loadPage()
})



loadPage()