import { color } from 'd3'
import d3Legend, { legendColor } from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  // TODO : Draw the legend using d3Legend
  // For help, see : https://d3-legend.susielu.com/

  var padding = width + 15 // On rajoute 15 pour ne pas avoir d'overlapping avec les données de 2015 et la légende
  g.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(' + padding + ',' + -10 + ')') // Le -10 permet de relever un peu la légende

  var array = ['oui', 'non']

  var legend = d3Legend.legendColor()
    .shape('circle')
    .title('Mesures Prises ?')
    .cells(2)
    .labels(['Non', 'Oui'])
    .scale(colorScale)


  g.select('.legend')
    .call(legend)
}
