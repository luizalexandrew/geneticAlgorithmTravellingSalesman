import cidades from './cidades'

const GeneticAlgorithmConstructor = function(config){

    return {
        start: function(){


            let population = initialPopulation(config.values, config.populationSize)
            
        
        }
    }

}

const aMutationFunctionYouSupply = function(){}


const yourCrossoverFunction = function(){}


const yourFitnessFunction = function(){}


const yourCompetitionFunction = function(){}


const initialPopulation = function(population, size){


    const suffleArray = function(array){
    
        for(let i = 0; i < array.length; i++){
    
          const j = Math.floor(Math.random() * i)
          const temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }
    
        return array
    }

    let pupulation = []

    for (let index = 0; index < size; index++) {
    
        let genome = suffleArray([...population])

        pupulation.push(genome)
        
    }

    return pupulation

}



var config = {
    mutationFunction: aMutationFunctionYouSupply,
    crossoverFunction: yourCrossoverFunction,
    fitnessFunction: yourFitnessFunction,
    doesABeatBFunction: yourCompetitionFunction,
    initialPopulation: initialPopulation,
    values: cidades,
    populationSize: 1000,
    searchResult: 1000,
    mutationValue: 0.1
}


var geneticalgorithm = GeneticAlgorithmConstructor(config)

geneticalgorithm.start()


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