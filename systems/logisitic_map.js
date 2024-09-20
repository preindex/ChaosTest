function logisticMap(r, x0, iterations) { // Actual logistic map function.
    let x = x0;
    const results = [];

    for (let i = 0; i < iterations; i++) {
        x = r * x * (1 - x);
        results.push(x);
    }

    return results;
}

const r = 0.5; // Growth rate
const x0 = 0.5; // Initial population
const iterations = 100; // Number of iterations

// Results of the variables above when input into logistic map.
const results = logisticMap(r, x0, iterations);
console.log('Logistic Map Results:', results);
