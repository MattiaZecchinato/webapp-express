const express = require('express');

const app = express();

const { PORT } = process.env;
const port = PORT;

// connection db
const connection = require('./data/db');


app.use('/', (req, res) => {

    res.send('Base test');
});

app.listen(port, () => {

    console.log(`listen on port:${port}`);
})