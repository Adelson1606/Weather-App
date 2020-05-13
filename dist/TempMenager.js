class TempManager {
  constructor () {
    this.cityData = []
  }

  getDataFromDB () {
    $.ajax({
      url: '/cities',
      type: "GET",
      dataType: 'json'
    })
      .done(data => {
        this.cityData = data
      })
  }
    
  async getCityData (cityName) {
    const data = await $.ajax({
      url: `/city/${cityName}`,
      type: "GET",
      dataType: 'json'
    })
    this.cityData.push(data)
  }

  async saveCity (cityName) {
    const cityFromArray = this.cityData.find(c => c.name === cityName)
    const data = await $.ajax({
      url: `/city`,
      type: "POST",
      dataType: 'json',
      data: cityFromArray
    })
  }

  async removeCity (cityName) {
    const deleteCity = await $.ajax({
      url: `/city/${cityName}`,
      type: "DELETE",
      dataType: 'json'
    })
    const indexOfCity = this.cityData.findIndex(c => c.name === cityName)
    this.cityData.splice(indexOfCity, 1)
  }
}