const express = require('express');

const app = express();

const { PORT } = process.env;
const port = PORT;

//movies router
const router = require('./routers/moviesRouter');

//middlewares
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');

app.get('/', (req, res) => {

    res.send('Base test');
});

app.use('/movies', router);

app.use(errorsHandler);

app.use(notFound);

app.listen(port, () => {

    console.log(`listen on port:${port}`);
})