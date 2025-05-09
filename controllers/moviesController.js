// movies db
const connection = require('../data/db')

//index
function index(req, res) {

    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, result) => {

        if(err) {

            return res.status(500).json({
                status: '500',
                error: 'Query error'
            });
        }

        res.json(result);
    });

    console.log('index path');
}

//show
function show(req, res) {

    const { id } = req.params;

    const message = `show path with id: ${id}`;

    res.send(message);
}

module.exports = { index, show };