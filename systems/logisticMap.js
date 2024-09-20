export function logisticMap(r, x0, iterations) { // Actual logistic map function.
    let x = x0;
    const results = [];

    for (let i = 0; i < iterations; i++) {
        x = r * x * (1 - x);
        results.push(x);
    }

    return results;
}