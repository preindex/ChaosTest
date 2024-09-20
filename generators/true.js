/*
    trueRandom
    Generates a random number given a range.
    This function utilizes environemntal factors such as atmospheric noise and radiation to generate numbers.
    How? By capturing it, and using some man-made translation.
*/

export async function trueRandom(low, high, max) {
    let Numbers = []
    // const N = low == high ? high : (await fetch(`https://www.random.org/integers/?num=${max || 1}&min=${low}&max=${high}&col=1&base=10&format=plain&rnd=new`)).text()
    const D = (await fetch(`https://www.random.org/decimal-fractions/?num=${max || 1}&dec=15&col=1&format=plain&rnd=new`)).text();

    // (await N).split('\n').forEach(element => {
    //     Numbers.push(parseInt(element))
    // });

    {
        let Index = 0;
        (await D).split('\n').forEach(element => {
            Numbers[Index] = parseFloat(element) * (high - low) + low;
        })
    }
    
    Numbers.pop()

    return Numbers;
}