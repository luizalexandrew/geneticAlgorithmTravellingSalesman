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
            let {bestFitness, bestIndividual} = getBestIndividual(populationWithFitness)
            let genationNumber = 0

            console.log(`Best Finess Initial Generation`, bestFitness)
            

            // console.log('Geração X melhor Fitness', bestFitness)

            while(bestFitness < breakScore || genationNumber <= interations){

                let myselection = selection(population)

                let populationWithCrossOver = crossoverFunction(myselection, populationSize, mutationFunction, mutationValue)
                
                let populationWithFitness = fitnessFunction(populationWithCrossOver)
                population = populationWithFitness
                let bestFitnessResponse = getBestIndividual(population)
                bestFitness = bestFitnessResponse.bestFitness
                bestIndividual = bestFitnessResponse.bestIndividual

                console.log(`Best Finess ${genationNumber} Generation`, calculateFitness(bestIndividual.genome))

              

                genationNumber++









            }

            
            console.log('******', bestFitness)
            console.log('Response: ', calculateFitness(bestIndividual.genome))

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

    let best = population[0]

    let max = population.reduce(function(prev, current) {

        if(prev.fitness > current.fitness){
            best = prev
            return prev
        }else{
            return current
        }


    })

    return {
        bestFitness: max.fitness,
        bestIndividual: best
    }

}

const aMutationFunctionYouSupply = function(individual, mutationValue){

    // console.log(individual)

    let value = getRndFloat(0, 100)


    if(value < mutationValue){
        

        let r1 = getRndInteger(0, individual.length - 1)
        let r2 = getRndInteger(0, individual.length - 1)

        if(r1 !== r2){

        
            let temp = individual[r1]
            individual[r1] = individual[r2]
            individual[r2] = temp

        }

        

    }

    return individual

}


const yourCrossoverFunction = function(population, size, mutationFunction, mutationValue){

    

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

        return mutationFunction([...newGenome], mutationValue)

    }

    let populationSize = population[0].genome.length

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

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndFloat(min, max) {
    return Math.random() * (max - min + 1) + min;
}

const fitnessFunction = function(population){

    

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
    interations: 25000,
    breakScore: 1000,
    mutationValue: 5
}


var geneticalgorithm = GeneticAlgorithmConstructor(config)

geneticalgorithm.start()
