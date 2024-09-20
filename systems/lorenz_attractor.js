const math = require('mathjs');
const Plotly = require('plotly.js-dist');

function lorenzAttractor(sigma, rho, beta, initial, dt, steps) {
    let [x, y, z] = initial;
    const points = [];

    for (let i = 0; i < steps; i++) {
        const dx = sigma * (y - x);
        const dy = x * (rho - z) - y;
        const dz = x * y - beta * z;

        x += dx * dt;
        y += dy * dt;
        z += dz * dt;

        points.push({ x, y, z });
    }

    return points;
}

const sigma = 10;
const rho = 28;
const beta = 8 / 3;
const initial = [1, 1, 1];
const dt = 0.01;
const steps = 10000;

const points = lorenzAttractor(sigma, rho, beta, initial, dt, steps);

const trace = {
    x: points.map(p => p.x),
    y: points.map(p => p.y),
    z: points.map(p => p.z),
    mode: 'lines',
    type: 'scatter3d'
};

const layout = {
    title: 'Lorenz Attractor',
    scene: {
        xaxis: { title: 'X' },
        yaxis: { title: 'Y' },
        zaxis: { title: 'Z' }
    }
};

Plotly.newPlot('plot', [trace], layout);
