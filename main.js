import {basic} from './generators/basic';
import { mersenne } from './generators/mersenne';
import { trueRandom } from './generators/true';
import {quantumRandom} from './generators/quantum';
import { logisticMap } from './systems/logisticMap';

const fs = require('fs');

let Maps = []

{ // Linear
    const x0 = 0.5; // Initial population
    const iterations = 100; // Number of iterations
    let Map = []
    for (var r = 3.5; r < 4; r+=0.034) { // 15x = 3.5
        Map.push([r, x0, iterations, `"${logisticMap(r, x0, iterations).toString()}`].join(', '))
    }
    console.log("Linear Maps done.")
    Maps.push(Map.join("\n------------[Linear Maps]-------------------\n"))
}

{ // Basic
    const x0 = 0.5; // Initial population
    const iterations = 100; // Number of iterations
    let Map = []
    for (var i = 0; i < 15; i++) {
        const r = basic(3, 4)
        Map.push([r, x0, iterations, logisticMap(r, x0, iterations)])
    }
    console.log("Basic Maps done.")
    Maps.push(Map.join("\n------------[Basic Maps]-------------------\n"))
}

{ // mersenne
    const x0 = 0.5; // Initial population
    const iterations = 100; // Number of iterations
    let Map = []
    for (var i = 0; i < 15; i++) {
        Map.push(logisticMap(mersenne(3, 4), x0, iterations))
    }
    console.log("Mersenne Maps done.")
    Maps.push(Map.join("\n------------[Mersenne Maps]-------------------\n"))
}

{ // true
    const x0 = 0.5; // Initial population
    const iterations = 100; // Number of iterations
    let Map = []
    let Numbers = await trueRandom(3, 4, 15)
    for (let i = 0; i < Numbers.length; i++){
        let r = Numbers[i]
        console.log(r)
        Map.push([r, x0, iterations, logisticMap(r, x0, iterations)])
    }
    console.log("True Maps done.")
    Maps.push(Map.join("\n------------[True Maps]-------------------\n"))
}

{ // quantum
    const x0 = 0.5; // Initial population
    const iterations = 100; // Number of iterations
    let Map = []
    let Numbers = await quantumRandom(3, 4, 15)
    for (let i = 0; i < Numbers.length; i++){
        let r = Numbers[i]
        console.log(r)
        Map.push([r, x0, iterations, logisticMap(r, x0, iterations)])
    }
    console.log("Quantum Maps done.")
    Maps.push(Map.join("\n------------[Quantum Maps]-------------------\n"))
}

fs.writeFileSync("data.txt", Maps.join("\n"));