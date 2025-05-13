// movies db
const connection = require('../data/db');

const { PUBLIC_PATH } = process.env;

//index
function index(req, res) {

    const sql = `SELECT movies.*, AVG(reviews.vote) AS avg_vote FROM movies 
                    JOIN reviews ON movies.id = reviews.movie_id 
                    GROUP BY movies.id`;

    connection.query(sql, (err, result) => {

        if(err) {

            return res.status(500).json({
                status: '500',
                error: 'Query error'
            });
        }

        res.json(result.map(currentMovie => (
            {
                ...currentMovie,
                imagePath: `${PUBLIC_PATH}public/imgs/movies-cover/${currentMovie.image}`
            }
        )));
    });

    console.log('index path');
}

//show
function show(req, res) {

    const id = parseInt(req.params.id);

    const moviesSql = 'SELECT * FROM movies WHERE id = ?';

    const reviewsSql = `SELECT reviews.* FROM reviews 
                            JOIN movies ON movies.id = reviews.movie_id 
                            WHERE movies.id = ?`;

    connection.query(moviesSql, [id], (err, moviesResult) => {

        if(err) {

            return res.status(500).json({
                status: '500',
                error: 'Query error'
            });
        }

        if(moviesResult.length === 0) {

            return res.status(404).json({
                status: '404',
                error: 'Movies not found'
            });
        }

        const currentResult = moviesResult[0];

        const movie = {

            ...currentResult,
            imagePath: `${PUBLIC_PATH}public/imgs/movies-cover/${currentResult.image}`
        }


        connection.query(reviewsSql, [id], (err, reviewsResult) => {

            if(err) {

                return res.status(500).json({
                    status: '500',
                    error: 'Query error'
                });
            }

            movie.reviews = reviewsResult;

            res.json(movie);
        });
    });

    console.log(`show path with id: ${id}`);
}

module.exports = { index, show };