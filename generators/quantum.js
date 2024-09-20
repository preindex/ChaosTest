/*
    quantumRandom
    Generates a random number given a range using quantum principles.
    Utilizes the qrandom.io API. I don't have a quantum computer lying around.
*/

// Iterative JavaScript program to count
// number of digits in a number

// Function to count digits
function divide(n) {
    if (n == 0) return 0;
    while (n > 1) {
        n = n / 10
    }
    return n;
}

export async function quantumRandom(low, high, max) {
    const URL = 'https://qrandom.io/api/random/ints';
    const Params = new URLSearchParams({
        min: 0,
        max: 214748364,
        n: max || 1
    })
    const Response = await fetch(`${URL}?${Params.toString()}`, {
        method: 'GET'
    });
    if (!Response.ok) {
        throw new Error(`HTTP error! status: ${Response.status} ${Response.statusText}`);
    }
    let Numbers = (await Response.json()).numbers
    for (let i = 0; i < Numbers.length; i++) {
        Numbers[i] = divide(Numbers[i]) * (high - low) + low
    }
    // console.log(DecimalData)
    return Numbers;
}