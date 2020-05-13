class Renderer {

  renderData () {
    const source = $('#main').html()
    const template = Handlebars.compile(source)
    const newHTML = templateUser(allCityData)
    $('.main-container').append(newHTML)
  }
}