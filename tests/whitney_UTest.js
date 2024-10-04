/*
    Mann Whitney U-Test
    Provides: U-Values, Critical Values, Significance Value, Value Evaluation
    Used to evaluate significance
*/

const utest = require('@tainakanchu/mann-whitney-utest')

export function whitney_UTest(map) {
    const G1 = map.slice(0, 50) // take one half of the map
    const G2 = map.slice(50, 100) // take the other half of the map

    const SAMPLES = [G1, G2] // treat the two halves as their own samples
    const U_VALUES = utest.test(SAMPLES) //get U-VALUES using the samples
    const CRITICAL_VALUE = utest.criticalValue(U_VALUES, SAMPLES) // calculate the critical value based on the U-VALUES and samples

    // return all the information about the samples
    return [CRITICAL_VALUE, U_VALUES, utest.significant(U_VALUES, SAMPLES) ? "Significant" : "Not Significant", utest.check(U_VALUES, SAMPLES) ? "Correct Values" : "Incorrect Values"]
}