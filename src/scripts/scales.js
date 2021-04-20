/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeCategory10.
 *
 * @param {object} data The data to be displayed
 * @returns {*} The ordinal scale used to determine the color
 */
export function setColorScale (data) {
  // TODO : Set scale
  const Scale = d3.scaleOrdinal()
    .domain([0, 1])
    .range(['red', 'green'])

  return Scale
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The logarithmic scale in X
 */
export function setXScale (width, data) {
  // TODO : Set scale

  // On récupère le CO2 de chacune des années et chacun des pays dans un seul tableau pour en trouver le minimum et le maximum
  var PerCapita = []
  console.log(data)
  //data.forEach(function (d) { PerCapita.push(d.PerCapita) })
  const max = d3.max(data , function (d) {
    return parseFloat(d.PerCapita)
  })
  console.log(max)
  const min = d3.min(data, function (d) {
    return parseFloat(d.PerCapita)
  })
  const Scale = d3.scaleLog()
    .domain([min, max ])
    .range([0, width])
  console.log(PerCapita)
  console.log(width)
  return Scale
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The logarithmic scale in Y
 */
export function setYScale (height, data) {
  // TODO : Set scale
// On récupère le % des Emissions Totales de chacune des années et chacun des pays dans un seul tableau pour en trouver le minimum et le maximum
  var percentTotalEmissions = []
  const max = d3.max(data , function (d) {
    return parseFloat(d.percentTotalEmissions)
  })
  console.log(max)
  const min = d3.min(data, function (d) {
    return parseFloat(d.percentTotalEmissions)
  })
  const Scale = d3.scaleLog()
    .domain([min, max])
    .range([height, 0])
  return Scale
}
