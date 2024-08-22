const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// GET route to handle addition via query parameters
app.get('/math/add', (req, res) => {
    const op1 = parseFloat(req.query.op1);
    const op2 = parseFloat(req.query.op2);
    if (isNaN(op1) || isNaN(op2)) {
        return res.status(400).send('Invalid input');
    }
    const result = op1 + op2;
    res.send(result.toString());
});

// POST route to handle addition via JSON payload
app.post('/math/add', (req, res) => {
    const { op1, op2 } = req.body;
    if (typeof op1 !== 'number' || typeof op2 !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }
    const result = op1 + op2;
    res.json({ result: result });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
