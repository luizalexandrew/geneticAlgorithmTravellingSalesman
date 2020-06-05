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
                selection,
                mutationValue,
                getBestIndividual,
                interations,
                breakScore
            } = config

            let population = initialPopulation(values, populationSize)

            let populationWithFitness = fitnessFunction(population)
            let bestFitness = getBestIndividual(populationWithFitness)
            let genationNumber = 0

            while(bestFitness < breakScore || genationNumber <= interations){




                let myselection = selection(population)

                console.log(myselection.length)


                genationNumber++




            }

            
            console.log('******', bestFitness)
        }
    }

}

const breakFunction = function(bestFitness, interations, breakInterations, breakScore){

    if(bestFitness >= breakScore)
        return true

    if(interations >= breakInterations)
        return true

    return false
    
}

const getBestIndividualImplement = function(population){

    let max = population.reduce(function(prev, current) {
        return (prev.fitness > current.fitness) ? prev : current
    })

    return max.fitness

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

    const base = 100000000;

    let populationWithFitness = population.map(individual=>{
        let fitness = calculateFitness(individual.genome)
        individual.fitness = base / fitness
        return individual
    })

    return populationWithFitness

}


const yourCompetitionFunction = function(population, percent=25){

    population.sort(function(a, b) {
        var keyA = a.fitness,
          keyB = b.fitness;

        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });

    let cut = population.length*percent/100

    return population.slice(0, cut)

}


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
    selection: yourCompetitionFunction,
    initialPopulation: initialPopulation,
    breakFunction: breakFunction,
    getBestIndividual: getBestIndividualImplement,
    values: cidades,
    populationSize: 1000,
    interations: 1000,
    breakScore: 1000,
    mutationValue: 0.1
}


var geneticalgorithm = GeneticAlgorithmConstructor(config)

geneticalgorithm.start()
