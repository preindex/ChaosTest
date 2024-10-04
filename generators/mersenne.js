/*
    mersenne
    Generates a random number using the Mersenne-Twister algorithm.
    Credits to Egor Gumenyuk (boo1ean) for the initial implementation.
*/

const twister = require('mersenne-twister')

export function mersenne(low = 0, high = 1, seed = process.hrtime()[1]) {
    var Generator = new twister(seed);
    var value = Generator.random();
    return value * (high - low) + low;
}