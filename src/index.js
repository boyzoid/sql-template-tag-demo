import express from 'express'
import sql from 'sql-template-tag'
import mysql from 'mysql'
import * as dotenv from 'dotenv'

//Init environment variables
dotenv.config()

//Create connection to MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_SCHEMA
});

// Define Express app
const app = express()
app.use(express.json())

//Routes

// Default route
app.get('/', (req, res) => {
    let msg = {message: 'Main endpoint'}
    res.send(msg)
});

app.get('/unsafe/:id', (req, res) => {
    // THIS IS VERY BAD - DON'T EVER WRITE A QUERY LIKE THIS
    const query = 'SELECT * FROM user WHERE id = ' + req.params.id
    connection.query(query, (err, results) => {
        res.send({
            _sql: query,
            results: results
        })
    })

})

app.get('/safe/:id', (req, res) => {
    // THIS IS THE WAY - the query is parameterized
    const query = 'SELECT * FROM user WHERE id = ?'
    const values = [req.params.id]
    connection.query(query, values, (err, results) => {
        res.send({
            _sql: query,
            _values: values,
            results: results
        })
    })

})

app.get('/easier/:id', (req, res) => {
    // This is easier. By using sql-template-tag and template literals
    // the query and params are generated in one statement.
    const query = sql`SELECT * FROM user WHERE id = ${req.params.id}`
    connection.query(query, (err, results) => {
        res.send({
            _sql: query.sql,
            _values: query.values,
            results: results,
        })
    })

})

//Start server
app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
});