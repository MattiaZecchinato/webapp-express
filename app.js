const express = require('express');
const cors = require('cors');

const app = express();

const { PORT, CLIENT_WEBAPP } = process.env;

console.log(process.env);
const port = PORT;

//movies router
const router = require('./routers/moviesRouter');

//middlewares
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');

app.use(cors({

    origin: CLIENT_WEBAPP
}));

app.use(express.static('public'));

app.get('/', (req, res) => {

    res.send('Base test');
});

app.use('/movies', router);

app.use(errorsHandler);

app.use(notFound);

app.listen(port, () => {

    console.log(`listen on port:${port}`);
})