export function logisticMap(r, x0, iterations, noise = 0) { // Actual logistic map function.
    console.log(noise);
    let x = x0;
    const results = [];

    for (let i = 0; i < iterations; i++) {
        x = r * x * (1 - x) + noise;
        results.push(x);
    }

    return results;
}