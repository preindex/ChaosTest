/*
    Confidence Interval
    Provides a range (min and max) for the average.
    The tighter the interval, the more confident and certain the range is.
    The wider, the more uncertain.
*/

const jstat = require('jstat');

export function calculateConfidenceInterval(data, confidenceLevel = 0.95) {
    const n = data.length; // sample size
    const mean = jstat.mean(data); // sample mean
    const standardError = jstat.stdev(data) / Math.sqrt(n); // calculate standard error
    const tScore = jstat.studentt.inv((1 + confidenceLevel) / 2, n - 1); // calculate t-Score

    const margin = tScore * standardError; // calculate margin of error
    return [mean - margin, mean + margin, mean]; // return range [min, max]
}