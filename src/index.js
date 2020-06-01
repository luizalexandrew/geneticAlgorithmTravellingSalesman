import cidades from './cidades'


const GeneticAlgorithmConstructor = function(){}
const aMutationFunctionYouSupply = function(){}
const yourCrossoverFunction = function(){}
const yourFitnessFunction = function(){}
const yourCompetitionFunction = function(){}
const initialPopulation = function(){}



var config = {
    mutationFunction: aMutationFunctionYouSupply,
    crossoverFunction: yourCrossoverFunction,
    fitnessFunction: yourFitnessFunction,
    doesABeatBFunction: yourCompetitionFunction,
    initialPopulation: initialPopulation(cidades),
    populationSize: 1000,
    searchResult: 1000
}


var geneticalgorithm = GeneticAlgorithmConstructor(config)






console.log(cidades)

// var config = {
//     mutationFunction: aMutationFunctionYouSupply,
//     crossoverFunction: yourCrossoverFunction,
//     fitnessFunction: yourFitnessFunction,
//     doesABeatBFunction: yourCompetitionFunction,
//     population: [ /* one or more phenotypes */ ],
//     populationSize: aDecimalNumberGreaterThanZero 	// defaults to 100
// }
// var GeneticAlgorithmConstructor = require('geneticalgorithm')
// var geneticalgorithm = GeneticAlgorithmConstructor( config )