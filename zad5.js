const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const zad5 = express();
const port = 3000;

const pool = new Pool({
    user: 'szuflix',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5433,
});

zad5.use(bodyParser.json());

zad5.post('/addUser', async (req, res) => {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
    res.json(result.rows[0]);
});

zad5.get('/getUserByID/:id', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(result.rows[0]);
});

zad5.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
});

zad5.put('/updateUserByID/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    res.json(result.rows[0]);
});

zad5.post('/addCar', async (req, res) => {
    const { brand, year, owner_id } = req.body;
    const result = await pool.query('INSERT INTO cars (brand, year, owner_id) VALUES ($1, $2, $3) RETURNING *', [brand, year, owner_id]);
    res.json(result.rows[0]);
});

zad5.get('/getCars', async (req, res) => {
    const result = await pool.query('SELECT * FROM cars');
    res.json(result.rows);
});

zad5.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
