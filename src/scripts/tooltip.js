/**
 * @param d
 */
export function ouinon (d) {
  var sortie
  if (d.Mesures == 0) {
    sortie = 'Non'
  } else {
    sortie = 'Oui'
  }
  return sortie
}

/**
 * @param d
 */
export function Implementation (d) {
  var sortie
  if (d['Date de mise en place'] == 0) {
    sortie = ''
  } else {
    sortie = d['Date de mise en place']
  }
  return sortie
}

/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  // TODO : Generate tooltip contents
  var Mesuress = ouinon(d)
  var Implementations = Implementation(d)

  // On définit un à un tous les éléments composant le tooltip
  var country = "<span style='font-weight:bold'> Country : </span> <span style='font-weight:normal'>" + d.Pays + '</span> <br>'
  var PercentTotalEmissions = "<span style='font-weight:bold'> % of Total CO2 Emissions : </span> <span style='font-weight:normal'>" + d.percentTotalEmissions + '(%) </span> <br>'
  var PerCapita = "<span style='font-weight:bold'> CO2 Per Capita : </span> <span style='font-weight:normal'>" + d.PerCapita + ' metric tonnes</span> <br>'
  var CurrentYear = "<span style='font-weight:bold'> Year : </span> <span style='font-weight:normal'>" + d.Annees + '</span> <br>'
  var Mesures = "<span style='font-weight:bold'> Mesures : </span> <span style='font-weight:normal'>" + Mesuress + '</span> <br>'
  var YearImplementation = "<span style='font-weight:bold'> Year of Measures implementation : </span> <span style='font-weight:normal'>" + Implementations + '</span> <br>'
  return country + PercentTotalEmissions + PerCapita + CurrentYear + Mesures + YearImplementation
}
