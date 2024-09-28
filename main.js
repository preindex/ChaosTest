import {basic} from './generators/basic';
import {mersenne} from './generators/mersenne';
import {trueRandom} from './generators/true';
import {quantumRandom} from './generators/quantum';
import {logisticMap} from './systems/logisticMap';
import {randomUUID} from 'crypto';
import { whitney_UTest } from './tests/whitney_UTest';
import { calculateConfidenceInterval } from './tests/confidenceInterval';
import { regressionTest } from './tests/regression';

const RUN_TRIALS = false;
const RUN_TESTS = !RUN_TRIALS;

const fs = require('fs');

const INITIAL_VALUE = 0.5; // Initial population
const ITERATIONS = 100; // Number of iterations
const MAP_COUNT = 15;
const TRIALS = 1; // Number of trials to conduct.

const CONSTANT_R = 0.034; // Lets us have 15 different maps in between 3.5 - 4.

const IDENTIFIERS = [
    "Linear (Normal)",
    "Basic",
    "Mersenne",
    "True",
    "Quantum"
]

async function generateData() {
    let Maps = ["type, r, initial_value, iterations, map"]
    let json_data = []

    { // Linear-vanilla logistic maps
        let Map = []
        let json_map = [];
        for (let r = 3.5; r < 4; r+= CONSTANT_R) {
            const RESULT_MAP = logisticMap(r, INITIAL_VALUE, ITERATIONS)
            let Array = ["linear", r, INITIAL_VALUE, ITERATIONS, `"${RESULT_MAP}"`]
            Map.push(Array.join(', '))
            Array[4] = RESULT_MAP
            // console.log(JSON.stringify([Array[4]]))
            console.log(typeof JSON.parse(JSON.stringify(Array)))
            json_map.push(JSON.stringify(Array))
        }
        console.log("Linear Maps done.")
        Maps.push(Map.join('\n'))
        json_data.push(json_map)
    }

    { // Basic-randomized logistic maps
        let Map = []
        let json_map = []
        for (let i = 0; i < 15; i++) {
            const r = basic(3.5, 4)
            const RESULT_MAP = logisticMap(r, INITIAL_VALUE, ITERATIONS)
            let Array = ["basic", r, INITIAL_VALUE, ITERATIONS, `"${RESULT_MAP}"`]
            Map.push(Array.join(', '))
            Array[4] = RESULT_MAP
            json_map.push(JSON.stringify(Array))
        }
        console.log("Basic Maps done.")
        Maps.push(Map.join('\n'))
        json_data.push(json_map)
    }

    { // mersenne-randomized logistic maps
        let Map = []
        let json_map = []
        for (let i = 0; i < 15; i++) {
            const r = mersenne(3.5, 4)
            console.log("i wanna die: " + r)
            const RESULT_MAP = logisticMap(r, INITIAL_VALUE, ITERATIONS)
            let Array = ["mersenne", r, INITIAL_VALUE, ITERATIONS, `"${RESULT_MAP}"`]
            Map.push(Array.join(', '))
            Array[4] = RESULT_MAP
            json_map.push(JSON.stringify(Array))
        }
        console.log("Mersenne Maps done.")
        Maps.push(Map.join('\n'))
        json_data.push(json_map)
    }

    { // true-randomized logistic maps
        let Map = []
        let json_map = []
        let Numbers = await trueRandom(3.5, 4, 15)
        for (let i = 0; i < Numbers.length; i++){
            let r = Numbers[i]
            const RESULT_MAP = logisticMap(r, INITIAL_VALUE, ITERATIONS)
            console.log(r)
            let Array = ["true", r, INITIAL_VALUE, ITERATIONS, `"${RESULT_MAP}"`]
            Map.push(Array.join(', '))
            Array[4] = RESULT_MAP
            json_map.push(JSON.stringify(Array))
        }
        console.log("True Maps done.")
        Maps.push(Map.join('\n'))
        json_data.push(json_map)
    }

    { // quantum-randomized logistic maps
        let Map = []
        let json_map = []
        let Numbers = await quantumRandom(3.5, 4, 15)
        for (let i = 0; i < Numbers.length; i++){
            let r = Numbers[i]
            const RESULT_MAP = logisticMap(r, INITIAL_VALUE, ITERATIONS)
            let Array = ["quantum", r, INITIAL_VALUE, ITERATIONS, `"${RESULT_MAP}"`]
            Map.push(Array.join(', '))
            Array[4] = RESULT_MAP
            json_map.push(JSON.stringify(Array))
        }
        console.log("Quantum Maps done.")
        Maps.push(Map.join('\n'))
        json_data.push(json_map)
    }

    const NAME = `${randomUUID()}.txt`
    fs.writeFileSync(`map_data/${NAME}`, Maps.join("\n")) 
    fs.writeFileSync(`json_data/${NAME}`, JSON.stringify(json_data));
    return NAME
}

async function test(Name) {
    let Results = []
    console.log(`Testing: ${Name}`)
    let file = JSON.parse(fs.readFileSync(`json_data/${Name}`))
    for (let typeIndex = 0; typeIndex < file.length; typeIndex++) {
        const TYPE = IDENTIFIERS[typeIndex]
        const data = file[typeIndex]
        console.log(`Testing Dataset: ${TYPE}\n${('-').repeat(99)}`)
        let Trial = 1;
        for (const string_json of data) {
            const [TYPE, R, INITIAL_VALUE, ITERATIONS, MAP] = JSON.parse(string_json)
            console.log(`${TYPE} #${Trial} Mann-Whitney U Test (${R}): ${whitney_UTest(MAP)}`)
            console.log(`Confidence Interval: ${calculateConfidenceInterval(MAP)}`)
            regressionTest(MAP)
            console.log(('-').repeat(99))
            Trial++
        } 
    }
    fs.writeFileSync(`test_data/${Name}`, Results.join('\n'))
}

if (RUN_TESTS) {
    fs.readdirSync(`${import.meta.dirname}/json_data`).forEach(test)
}

if (RUN_TRIALS) {
    for (let trial = 1; trial < TRIALS + 1; trial++) {
        const NAME = await generateData();
        console.log(`Trial #${trial} completed. (${NAME})`)
        if (RUN_TESTS) {
            await test(NAME)
        }
    }
    console.log("Finished generating data.")
}