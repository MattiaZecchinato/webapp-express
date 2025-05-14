// movies db
const connection = require('../data/db');

const { PUBLIC_PATH } = process.env;

//index
function index(req, res) {

    const sql = `SELECT movies.*, ROUND(AVG(reviews.vote), 1) AS avg_vote FROM movies 
                    LEFT JOIN reviews ON movies.id = reviews.movie_id 
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
                imagePath: `${PUBLIC_PATH}imgs/movies-cover/${currentMovie.image}`
            }
        )));
    });

    console.log('index path');
}

//show
function show(req, res) {

    const id = parseInt(req.params.id);

    const movieSql = `SELECT movies.*, ROUND(AVG(reviews.vote), 1) AS avg_vote FROM movies 
                    LEFT JOIN reviews ON movies.id = reviews.movie_id 
                    WHERE movies.id = ?
                    GROUP BY movies.id`;

    const reviewsSql = `SELECT reviews.* FROM reviews 
                            JOIN movies ON movies.id = reviews.movie_id
                            WHERE movies.id = ?`;

    connection.query(movieSql, [id], (err, moviesResult) => {

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
            imagePath: `${PUBLIC_PATH}imgs/movies-cover/${currentResult.image}`
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

function addReview(req, res) {

    const id = parseInt(req.params.id);

    const { name, vote, text } = req.body;

    const sql = `INSERT INTO db_movies.reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?);`

    connection.query(sql, [id, name, parseInt(vote), text], (err) => {

        if(err) {

            return res.status(500).json({
                status: '500',
                error: 'Query error'
            });
        }

        res.status(201).json({id_movie: id, name, vote, text});
    })
}

module.exports = { index, show, addReview };