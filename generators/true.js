/*
    trueRandom
    Generates a random number given a range.
    This function utilizes environemntal factors such as atmospheric noise and radiation to generate numbers.
    How? By capturing it, and using some man-made translation.
*/

export async function trueRandom(low, high, max) {
    let Numbers = []
    const D = (await fetch(`https://www.random.org/decimal-fractions/?num=${max || 1}&dec=15&col=1&format=plain&rnd=new`)).text();

    {
        let Index = 0;
        (await D).split('\n').forEach(element => {
            let value = parseFloat(element) * (high - low) + low;
            if (isNaN(value)) return;
            Numbers[Index++] = value;
        })
    }
    
    return Numbers;
}