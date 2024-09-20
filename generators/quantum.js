/*
    quantumRandom
    Generates a random number given a range using quantum principles.
    Utilizes the qrandom.io API. I don't have a quantum computer lying around.
*/

export async function quantumRandom(low, high, max) {
    const URL = 'https://qrandom.io/api/random/ints';
    const Params = new URLSearchParams({
        min: low || 1,
        max: high || 10,
        n: max || 1
    });
    const Response = await fetch(`${URL}?${Params.toString()}`, {
        method: 'GET'
    });
    if (!Response.ok) {
        throw new Error(`HTTP error! status: ${Response.status} ${Response.statusText}`);
    }
    return (await Response.json()).numbers;
}