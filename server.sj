const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve your static files (HTML, CSS, JS)

// Endpoint to run Python script
app.post('/run-script', (req, res) => {
    const argument = req.body.argument;
    const pythonScriptPath = path.join(, 'script.py');

    exec(`python3 ${pythonScriptPath} ${argument}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).send('Error executing script');
        }
        if (stderr) {
            console.error(`Script error: ${stderr}`);
            return res.status(500).send('Script error');
        }

        console.log(`Script output: ${stdout}`);
        res.status(200).send('Script executed successfully');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
