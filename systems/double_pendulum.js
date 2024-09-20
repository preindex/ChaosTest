const math = require('mathjs');
const Plotly = require('plotly.js-dist');

function doublePendulum(theta1, theta2, p1, p2, g, l1, l2, m1, m2, dt, steps) {
    const results = [];

    for (let i = 0; i < steps; i++) {
        // Equations of motion for the double pendulum
        const dtheta1 = (p1 - p2 * math.cos(theta1 - theta2)) / (l1 * (m1 + m2 * math.sin(theta1 - theta2) ** 2));
        const dtheta2 = (p2 * (m1 + m2) - p1 * m2 * math.cos(theta1 - theta2)) / (l2 * m2 * (m1 + m2 * math.sin(theta1 - theta2) ** 2));
        const dp1 = -(m1 + m2) * g * l1 * math.sin(theta1) - dtheta1 * dtheta2 * m2 * l1 * l2 * math.sin(theta1 - theta2);
        const dp2 = -m2 * g * l2 * math.sin(theta2) + dtheta1 * dtheta2 * m2 * l1 * l2 * math.sin(theta1 - theta2);

        theta1 += dtheta1 * dt;
        theta2 += dtheta2 * dt;
        p1 += dp1 * dt;
        p2 += dp2 * dt;

        results.push({ theta1, theta2 });
    }

    return results;
}

const theta1 = Math.PI / 4;
const theta2 = Math.PI / 4;
const p1 = 0;
const p2 = 0;
const g = 9.81;
const l1 = 1;
const l2 = 1;
const m1 = 1;
const m2 = 1;
const dt = 0.01;
const steps = 10000;

const results = doublePendulum(theta1, theta2, p1, p2, g, l1, l2, m1, m2, dt, steps);

const trace1 = {
    x: results.map(p => p.theta1),
    y: results.map(p => p.theta2),
    mode: 'lines',
    type: 'scatter'
};

const layout = {
    title: 'Double Pendulum',
    xaxis: { title: 'Theta1' },
    yaxis: { title: 'Theta2' }
};

Plotly.newPlot('plot', [trace1], layout);
