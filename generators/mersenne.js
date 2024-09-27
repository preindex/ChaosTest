/*
    mersenne
    Generates a random number using the Mersenne-Twister algorithm.
    Credits to Egor Gumenyuk (boo1ean) for the initial implementation.
*/

const twister = require('mersenne-twister')

export function mersenne(low, high, seed) {
    var Generator = new twister(process.hrtime());
    var value = Generator.random();
    if (low != null & high != null) {
        value = value * (high - low) + low
    }
    return value;
}

for (let i = 0; i < 100; i++) {
    console.log(mersenne(3.5, 4))
}