import { csvParse } from 'd3-dsv'
import * as helper from './helper.js'
import * as scales from './scales.js'

/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {
  // TODO : Position axis labels
  d3.select('.y.axis-text')
    .attr('y', height / 2)
    .attr('x', -50)

  d3.select('.x.axis-text')
    .attr('x', width / 2)
    .attr('y', height + 50)
}

/**
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param dataByYear
 * @param dataByCountry
 * @param {*} colorScale The scale for the circles' color
 * @param xScale
 * @param yScale
 * @param mode
 */
export function drawCircles (data, colorScale, xScale, yScale) {
  // TODO : Draw the bubble chart's circles
  // Each circle's size depends on its population
  // and each circle's color depends on its continent.
  // The fill opacity of each circle is 70%
  // The outline of the circles is white

  d3.select('#graphe')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .transition()
    .duration(500)
    .attr('cx', function (d) { return xScale(d.PerCapita) })
    .attr('cy', function (d) { return yScale(d.percentTotalEmissions) })
    .attr('fill', function (d) { return colorScale(d.Mesures) })
    .attr('r', '10px')
    .attr('opacity', 0.7)
    .attr('stroke', 'white')
}

/**
 * Update the title of the graph.
 *
 * @param {number} year The currently displayed year
 */
export function setTitleText (year) {
  // TODO : Set the title
  d3.select('.title')
    .text('Data for year : ' + year)
}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setCircleHoverHandler (tip) {
  // TODO : Set hover handler. The tooltip shows on
  // hover and the opacity goes up to 100% (from 70%)
  d3.selectAll('.dot')

    .on('mouseover', function (d) { // Lorsque l'élément est survolé, on change l'opacité et on affiche le tooltip
      tip.show(d, this)
      d3.select(this).attr('opacity', 1)
    })
  // .on('mouseover', tip.show)

    .on('mouseout', function (d) { // Lorsque l'élément n'est plus survolé, l'opacité revient à la normale et le tooltip disparait
      tip.hide(d, this)
      d3.select(this).attr('opacity', 0.7)
    })
}

/**
 * @param pays
 */
function getIndex (pays) {
  d3.csv('https://raw.githubusercontent.com/LSNoor/INF8808Visualisation4/main/Conversion2.csv').then((data2) => {
    // data2.forEach(function (d) {
    var i = 0
    while (data2[i].Pays != pays) {
      i++
    }
    return (i)
  })
}
var selection = []

/**
 * @param data
 * @param dataByYear
 * @param dataByCountry
 * @param year
 * @param colorScale
 * @param xScale
 * @param yScale
 * @param tip
 * @param Index
 * @param mode
 * @param ICountry
 */
export function setCircleClickHandler (dataByYear, dataByCountry, year, colorScale, xScale, yScale, tip, mode, ICountry) {
  d3.selectAll('.dot')

    .on('click', function (data) {
      mode.push(1)

      d3.csv('https://raw.githubusercontent.com/LSNoor/INF8808Visualisation4/main/DataFinal%20(2).csv').then((doon) => {
        var dataByCountry = helper.GroupByCountry(data)
        var dataByYear = helper.GroupByYear(data)
      })
      var data2 = helper.mode(dataByYear, dataByCountry, 'Toutes', 1, data.Index)
      d3.select('#graphe')
        .selectAll('circle')
        .remove()

      drawCircles(data2, colorScale, xScale, yScale)
      setTitleText('Toutes')
      setCircleHoverHandler(tip)
    })
}
