const regression = require('regression');

function preparePairs(map) {
    let Pairs = []
    for (let i = 0; i < map.length - 1; i++) {
        Pairs.push([map[i], map[i + 1]])
    }
    return Pairs
}

export function regressionTest(map) {
    const pairs = preparePairs(map);
    const result = regression.polynomial(pairs, {
        order: 2
    });

    console.log(`Equation: ${result.string}`);
    console.log(`R-Squared Value: ${result.r2}`)
    return result
}