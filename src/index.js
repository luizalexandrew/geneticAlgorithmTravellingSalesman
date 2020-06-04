import cidades from './cidades'

const GeneticAlgorithmConstructor = function(config){

    return {
        start: function(){

            let {
                initialPopulation, 
                values,
                populationSize, 
                mutationFunction, 
                searchResult,  
                crossoverFunction, 
                fitnessFunction, 
                doesABeatBFunction,
                mutationValue
            } = config

            let population = initialPopulation(values, populationSize)

            let populationWithFitness = fitnessFunction(population)
            console.log(populationWithFitness)
            
        
        }
    }

}

var config = {
    mutationFunction: aMutationFunctionYouSupply,
    crossoverFunction: yourCrossoverFunction,
    fitnessFunction: fitnessFunction,
    doesABeatBFunction: yourCompetitionFunction,
    initialPopulation: initialPopulation,
    values: cidades,
    populationSize: 1000,
    searchResult: 1000,
    mutationValue: 0.1
}







const aMutationFunctionYouSupply = function(){}


const yourCrossoverFunction = function(){}


const fitnessFunction = function(population){

    function calculateDistance(cidadeOrigem, cidadeDestino){
        return 6371 * Math.acos(Math.cos(Math.PI*(90-cidadeDestino.latitude)/180)*Math.cos((90-cidadeOrigem.latitude)*Math.PI/180)+Math.sin((90-cidadeDestino.latitude)*Math.PI/180)*Math.sin((90-cidadeOrigem.latitude)*Math.PI/180)*Math.cos((cidadeOrigem.longitude-cidadeDestino.longitude)*Math.PI/180))
    }

    function calculateFitness(cidades){
        let length = cidades.length - 1;
        let fitness = 0;

        for (let index = 0; index < length; index++) {
            
            fitness += calculateDistance(cidades[index], cidades[index+1])

        }

        fitness += calculateDistance(cidades[length], cidades[0])
        return fitness
    }

    let populationWithFitness = population.map(individual=>{
        let fitness = calculateFitness(individual.genome)
        individual.fitness = fitness
        return individual
    })

    return populationWithFitness


}


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
        let individual = {}
        individual.genome = suffleArray([...population])
        individual.fitness = undefined;
        pupulation.push({...individual})        
    }

    return pupulation

}



var config = {
    mutationFunction: aMutationFunctionYouSupply,
    crossoverFunction: yourCrossoverFunction,
    fitnessFunction: fitnessFunction,
    doesABeatBFunction: yourCompetitionFunction,
    initialPopulation: initialPopulation,
    values: cidades,
    populationSize: 1000,
    searchResult: 1000,
    mutationValue: 0.1
}


var geneticalgorithm = GeneticAlgorithmConstructor(config)

geneticalgorithm.start()
