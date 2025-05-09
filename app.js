const express = require('express');

const app = express();

const port = 3000;

app.use('/', (req, res) => {

    res.send('Base test');
});

app.listen(port, () => {

    console.log(`listen on port:${port}`);
})