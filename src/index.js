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

            console.log(populationWithFitness)

            // console.log('Geração X melhor Fitness', bestFitness)

            while(bestFitness < breakScore || genationNumber <= interations){

                let myselection = selection(population)

                let populationWithCrossOver = crossoverFunction(myselection, populationSize)

                // console.log(populationWithCrossOver)

                // let populationWithFitness = fitnessFunction(populationWithCrossOver)
                // let bestFitness = getBestIndividual(populationWithFitness)

                // console.log('Geração X melhor Fitness', getBestIndividual(bestFitness))

                break


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


const yourCrossoverFunction = function(population, size){

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function OX(parent1, parent2) {

        const length = parent1.length

        let r1 = getRndInteger(0, length)
        let r2 = getRndInteger(0, length)
    
        if(r1 >= r2){
            let temp = r1
            r1 = r2
            r2 = temp
        }

        let newGenome = []

        for (let index = r1; index < r2; index++) {
            newGenome[index] = parent1[index]; 
        }

        let elementNotPresent = []
        let j = 0

        for (let index = 0; index < length; index++) {

            if(!newGenome.includes(parent2[index])){
                elementNotPresent[j] = parent2[index]
                j++
            }

        }

        let elementNotPresentIndex = 0

        for (let index = 0; index < length; index++) {


            if(!newGenome[index]){
                newGenome[index] = elementNotPresent[elementNotPresentIndex]
                elementNotPresentIndex++

            }
          
        }

        return [...newGenome]

    }

    let populationSize = population.length

    while(population.length < size){

        let parent1 = getRndInteger(0, populationSize)
        let parent2 = getRndInteger(0, populationSize)

        let child = {
            genome: [],
            fitness: undefined
        }
        
        
        child.genome = OX(population[parent1].genome, population[parent2].genome)

        population.push(child)

    }
    
    return population
}


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
