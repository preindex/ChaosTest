import {basic} from './generators/basic';
import {mersenne} from './generators/mersenne';
import {trueRandom} from './generators/true';
import {quantumRandom} from './generators/quantum';
import {logisticMap} from './systems/logisticMap';
import {randomUUID} from 'crypto';

const fs = require('fs');

const INITIAL_VALUE = 0.5; // Initial population
const ITERATIONS = 100; // Number of iterations
const MAP_COUNT = 15;
const TRIALS = 1; // Number of trials to conduct.

const CONSTANT_R = 0.034; // Lets us have 15 different maps in between 3.5 - 4.

async function generateData() {
    let Maps = ["type, r, initial_value, iterations, map"]

    { // Linear-vanilla logistic maps
        let Map = []
        for (let r = 3.5; r < 4; r+= CONSTANT_R) {
            Map.push(["linear", r, INITIAL_VALUE, ITERATIONS, `"${logisticMap(r, INITIAL_VALUE, ITERATIONS).toString()}"`].join(', '))
        }
        console.log("Linear Maps done.")
        Maps.push(Map.join('\n'))
    }

    { // Basic-randomized logistic maps
        let Map = []
        for (let i = 0; i < 15; i++) {
            const r = basic(3.5, 4)
            Map.push(["basic", r, INITIAL_VALUE, ITERATIONS, `"${logisticMap(r, INITIAL_VALUE, ITERATIONS)}"`].join(', '))
        }
        console.log("Basic Maps done.")
        Maps.push(Map.join('\n'))
    }

    { // mersenne-randomized logistic maps
        let Map = []
        for (let i = 0; i < 15; i++) {
            const r = mersenne(3.5, 4)
            Map.push(["mersenne", r, INITIAL_VALUE, ITERATIONS, `"${logisticMap(r, INITIAL_VALUE, ITERATIONS)}"`].join(', '))
        }
        console.log("Mersenne Maps done.")
        Maps.push(Map.join('\n'))
    }

    { // true-randomized logistic maps
        let Map = []
        let Numbers = await trueRandom(3.5, 4, 15)
        for (let i = 0; i < Numbers.length; i++){
            let r = Numbers[i]
            console.log(r)
            Map.push(["true", r, INITIAL_VALUE, ITERATIONS, `"${logisticMap(r, INITIAL_VALUE, ITERATIONS)}"`].join(', '))
        }
        console.log("True Maps done.")
        Maps.push(Map.join('\n'))
    }

    { // quantum-randomized logistic maps
        let Map = []
        let Numbers = await quantumRandom(3.5, 4, 15)
        for (let i = 0; i < Numbers.length; i++){
            let r = Numbers[i]
            Map.push(["quantum", r, INITIAL_VALUE, ITERATIONS, `"${logisticMap(r, INITIAL_VALUE, ITERATIONS)}"`].join(', '))
        }
        console.log("Quantum Maps done.")
        Maps.push(Map.join('\n'))
    }

    fs.writeFileSync(`data/${randomUUID()}.txt`, Maps.join("\n"));
}

for (let trial = 1; trial < TRIALS + 1; trial++) {
    await generateData();
    console.log(`Trial #${trial} completed.`)
}

console.log("Finished generating data.")
console.log(3.5 / 15)