/*
    basic
    Generates a random number using the built-in Math.random() function.
    Well, at least it's more random; like when I hate on Maria.
*/

export function basic(low, high) {
    return Math.round(Math.random() * (high - low) + low)
}