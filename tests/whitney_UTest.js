const utest = require('@tainakanchu/mann-whitney-utest')

export async function whitney_UTest(map) {
    const G1 = map.slice(0, 50)
    const G2 = map.slice(50, 100)

    const SAMPLES = [G1, G2]
    const U_VALUES = utest.test(SAMPLES)

    return [U_VALUES, utest.significant(U_VALUES, SAMPLES) ? "Significant" : "Not Significant", utest.check(U_VALUES, SAMPLES) ? "Correct Values" : "Incorrect Values"]
}