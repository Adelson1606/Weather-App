class Renderer {

  renderData (allCityData, searchedCity) {
    $('.main-container').empty()
    const source = $('#main').html()
    const template = Handlebars.compile(source)
    const newHTML = template({ allCityData })
    $('.main-container').append(newHTML)
  }
}