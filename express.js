const express = require('express');
const app = express();


function calculateMean(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

function calculateMedian(numbers) {
    numbers.sort((a, b) => a - b);
    const mid = Math.floor(numbers.length / 2);

    return numbers.length % 2 !== 0
        ? numbers[mid]
        : (numbers[mid - 1] + numbers[mid]) / 2;
}

function calculateMode(numbers) {
    const frequency = {};
    numbers.forEach(num => frequency[num] = (frequency[num] || 0) + 1);

    let mode = numbers[0];
    let maxCount = 0;

    for (const num in frequency) {
        if (frequency[num] > maxCount) {
            mode = Number(num);
            maxCount = frequency[num];
        }
    }

    return mode;
}

function parseNums(nums) {
    if (!nums) {
        throw new Error("nums are required.");
    }

    const numArray = nums.split(',').map(num => {
        const parsed = parseFloat(num);
        if (isNaN(parsed)) {
            throw new Error(`${num} is not a number.`);
        }
        return parsed;
    });

    return numArray;
}

app.get('/mean', (req, res) => {
    try {
        const nums = parseNums(req.query.nums);
        const mean = calculateMean(nums);
        res.json({ operation: 'mean', value: mean });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/median', (req, res) => {
    try {
        const nums = parseNums(req.query.nums);
        const median = calculateMedian(nums);
        res.json({ operation: 'median', value: median });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/mode', (req, res) => {
    try {
        const nums = parseNums(req.query.nums);
        const mode = calculateMode(nums);
        res.json({ operation: 'mode', value: mode });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Remove or conditionally execute server start logic
if (require.main === module) {
    app.listen(3000, function () {
        console.log('App on port 3000');
    });
}
module.exports = app;

