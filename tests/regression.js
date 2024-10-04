/*
    Regression Analysis
    Provides: Equation, R^2 Value
*/

const regression = require('regression');

function preparePairs(map) { // For all entries, create pairs of 2, resulting 50 pairs of 2.
    let Pairs = []
    for (let i = 0; i < map.length - 1; i++) {
        Pairs.push([map[i], map[i + 1]])
    }
    return Pairs
}

export function regressionTest(map) {
    const pairs = preparePairs(map);
    const result = regression.polynomial(pairs, { // Using the pairs, calculate the regression
        order: 2 // the number of terms & coefficients to solve for. used for regression fitting
    });
    return result
}