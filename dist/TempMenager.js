class TempManager {
  constructor () {
    this.cityData = []

    this.searchedCity = null
  }

  async getDataFromDB () {
    const oldData = await $.get('/cities') 
    this.cityData = oldData
  }
    
  async getCityData (cityName) {
    const data = await $.get(`/city/${cityName}`)
    const alreadyExists = this.cityData.find(c => c.name.toUpperCase() === cityName.toUpperCase())

    if (alreadyExists) {
      return
    }

    this.searchedCity = data
    this.cityData.unshift(this.searchedCity)

  }

  async saveCity (cityName) {
    const cityFromArray = this.cityData.find(c => c.name.toUpperCase() === cityName.toUpperCase())
    const data = await $.post(`/city`, this.cityData[0])
    const cityIndex = this.cityData.indexOf(cityFromArray)
    this.cityData.splice(cityIndex, 1)
    this.cityData.unshift(data)
  }

  removeCity (cityName) {
    const deleteCity = $.ajax({
      url: `/city/${cityName}`,
      type: "DELETE",
      dataType: 'json'
    })
    const indexOfCity = this.cityData.findIndex(c => c.name === cityName)
    this.cityData.splice(indexOfCity, 1)
  }

  async updateCity (cityName) {
    const newData = await $.ajax({
      url: `/city/${cityName}`,
      type: 'PUT',
      dataType: 'json'
    })
    const indexOfCity = this.cityData.findIndex(c => c.name === cityName)
    this.cityData.splice(indexOfCity, 1)
    this.cityData.push(newData)
  }

}