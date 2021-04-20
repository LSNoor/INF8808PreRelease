'use strict'

// Importation des scripts
import * as helper from './scripts/helper.js'
import * as tooltip from './scripts/tooltip.js'
import * as viz from './scripts/viz.js'
import * as scales from './scripts/scales.js'
import * as legend from './scripts/legend.js'
import d3Tip from 'd3-tip'
import { sliderHorizontal } from 'd3-simple-slider';

(function (d3) {
  const margin = {
    top: 125,
    right: 200,
    bottom: 100,
    left: 80
  }

  // Declaration des variables
  var currentYear = [2000]
  let svgSize, graphSize

  // Appel de la fonction permettant de gérer la taille du graphe
  setSizing()

  // Création du canvas g
  var g = d3.select('.graph').select('svg').append('g').attr('id', 'graphe').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Création du tootip et appel de celui-ci
  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
  g.call(tip)

  // Ajout des axes au canva
  helper.appendAxes(g)
  helper.appendGraphLabels(g)

  // Positionement des axes
  viz.positionLabels(g, graphSize.width, graphSize.height)

  // Création des bouttons
  helper.drawButton1(g, graphSize.width)
  helper.drawButton2(g, graphSize.width)
  helper.drawButton3(g, graphSize.width)

  // Ajout du titre du graphe
  helper.placeTitle(g, graphSize.width)

  // Ajout du slider
  var slider = sliderHorizontal()
    .min(1960)
    .max(2016)
    .step(1)
    .ticks(10)
    .width(1250)
    .default(1970)

  // Call du slider
  var s = d3.select('#bubble-chart')
    .append('svg')
    .attr('class', 'slider')
    .attr('width', '1500')
    .attr('height', '100')
    .append('g')
    .attr('transform', 'translate( 250,50)')
  s.call(slider)

  // Importation des données
  d3.csv('https://raw.githubusercontent.com/LSNoor/INF8808Visualisation4/main/DataFinal%20(2).csv').then((data) => {
    // console.log(data)

    // Groupage des données

    console.log(data)
    var dataByCountry = helper.GroupByCountry(data)
    var dataByYear = helper.GroupByYear(data)

    var ICountry = [0]
    var mode = [0]

    currentYear = currentYear[currentYear.length - 1]

    data = helper.mode(dataByYear, dataByCountry, currentYear, mode[mode.length - 1], ICountry[ICountry.length - 1])
    console.log(data)
    console.log(dataByCountry)
    // Importation des échelles
    const colorScale = scales.setColorScale(data)
    var xScale = scales.setXScale(graphSize.width, data)
    var yScale = scales.setYScale(graphSize.height, data)

    // Tracage des axes
    helper.drawXAxis(xScale, graphSize.height)
    helper.drawYAxis(yScale)

    // Tracage de la légende
    legend.drawLegend(colorScale, g, graphSize.width)

    build(data, currentYear, colorScale, xScale, yScale)

    viz.setCircleHoverHandler(tip)

    setClickHandler1(dataByYear, dataByCountry, currentYear, colorScale, xScale, yScale, tip, mode, ICountry)
    setClickHandler2(dataByYear, dataByCountry, currentYear, colorScale, xScale, yScale, tip, mode, ICountry, g, graphSize.width)
    setClickHandler3(dataByYear, dataByCountry, colorScale, xScale, yScale, tip, mode, ICountry, g, graphSize.width)

    /**
     * Sets up the click handler for the button1.
     *
     * @param dataByYear
     * @param dataByCountry
     * @param year
     * @param colorScale
     * @param xScale
     * @param yScale
     * @param tip
     * @param mode
     * @param ICountry
     */
    function setClickHandler1 (dataByYear, dataByCountry, year, colorScale, xScale, yScale, tip, mode, ICountry) {
      d3.select('#button1')
        .on('click', () => {
          data = helper.mode(dataByYear, dataByCountry, currentYear, mode[mode.length - 1], ICountry[ICountry.length - 1])
          viz.setCircleClickHandler(dataByYear, dataByCountry, year, colorScale, xScale, yScale, tip, mode, ICountry)
        }
        )
    }

    /**
     * Sets up the click handler for the button2.
     *
     * @param dataByYear
     * @param dataByCountry
     * @param year
     * @param colorScale
     * @param xScale
     * @param yScale
     * @param tip
     * @param mode
     * @param ICountry
     * @param g
     * @param width
     */
    function setClickHandler2 (dataByYear, dataByCountry, year, colorScale, xScale, yScale, tip, mode, ICountry, g, width) {
      d3.select('#button2')
        .on('click', () => {
          d3.select('#graphe')
            .selectAll('.dot')
            .remove()
          data = helper.mode(dataByYear, dataByCountry, currentYear, 0, ICountry[ICountry.length - 1])
          xScale = scales.setXScale(graphSize.width, data)
          yScale = scales.setYScale(graphSize.height, data)
          helper.drawXAxis(xScale, graphSize.height)
          helper.drawYAxis(yScale)
          build(data, year, colorScale, xScale, yScale)
          viz.setCircleHoverHandler(tip)
          legend.drawLegend(colorScale, g, width)
        }
        )
    }

    /**
     * Sets up the click handler for the button2.
     *
     * @param currentYear
     * @param dataByYear
     * @param dataByCountry
     * @param colorScale
     * @param xScale
     * @param yScale
     * @param tip
     * @param mode
     * @param ICountry
     * @param g
     * @param width
     */
    function setClickHandler3 (dataByYear, dataByCountry, colorScale, xScale, yScale, tip, mode, ICountry, g, width) {
      d3.select('#button3')
        .on('click', () => {
          d3.select('#graphe')
            .selectAll('.dot')
            .remove()

          data = helper.mode(dataByYear, dataByCountry,2010,0,0)
          xScale = scales.setXScale(graphSize.width, data)
          yScale = scales.setYScale(graphSize.height, data)
          helper.drawXAxis(xScale, graphSize.height)
          helper.drawYAxis(yScale)
          build(data, 2010, colorScale, xScale, yScale)
          viz.setCircleHoverHandler(tip)
          legend.drawLegend(colorScale, g, width)
        }
        )
    }
  }
  )

  /**
   *   This function handles the graph's sizing.
   */
  function setSizing () {
    svgSize = {
      width: 1920,
      height: 1080
    }

    graphSize = {
      width: svgSize.width - margin.right - margin.left,
      height: svgSize.height - margin.bottom - margin.top
    }

    helper.setCanvasSize(svgSize.width, svgSize.height)
  }

  /**
   * This function builds the graph.
   *
   * @param {object} data The data to be used
   * @param {number} transitionDuration The duration of the transition while placing the circles
   * @param dataByYear
   * @param dataByCountry
   * @param {number} year The year to be displayed
   * @param {*} rScale The scale for the circles' radius
   * @param {*} colorScale The scale for the circles' color
   * @param {*} xScale The x scale for the graph
   * @param {*} yScale The y scale for the graph
   */
  function build (data, year, colorScale, xScale, yScale) {
    viz.drawCircles(data, colorScale, xScale, yScale)
    viz.setTitleText(year)
  }
})(d3)
