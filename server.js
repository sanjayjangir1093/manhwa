const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'database-1.c3gaacw0i6sx.us-east-1.rds.amazonaws.com', // Your RDS endpoint
    user: 'admin',              // Your DB username
    password: 'mypassword',     // Your DB password
    database: 'manhwa_db'       // Use the correct database name
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});
// Endpoint to get manhwa data
app.get('/', (req, res) => {
    connection.query('SELECT * FROM manhwa', (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving data from database');
        }
        const manhwaList = results.map(manhwa => `
            <li>
                <strong>${manhwa.title}</strong> (${manhwa.genre}): ${manhwa.description}
            </li>
        `).join('');

        res.send(`
            <h1>Welcome to the Fantasy Manhwa List</h1>
            <ul>${manhwaList}</ul>
        `);
    });
});


// Root endpoint to serve a simple HTML page
app.get('/', (req, res) => {
    res.send(`
        <h1>database-1.c3gaacw0i6sx.us-east-1.rds.amazonaws.com List</h1>
        <p>Visit <a href="/manhwa">/manhwa</a> to see the list.</p>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
