const jstat = require('jstat');

export function calculateConfidenceInterval(data, confidenceLevel = 0.95) {
    const n = data.length;
    const mean = jstat.mean(data);
    const standardError = jstat.stdev(data) / Math.sqrt(n);
    const tScore = jstat.studentt.inv((1 + confidenceLevel) / 2, n - 1);

    const margin = tScore * standardError;
    return [mean - margin, mean + margin, mean];
}