const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multerMovieImg');

//movies controller
const controller = require('../controllers/moviesController');

//index
router.get('/', controller.index);

//show
router.get('/:id', controller.show);

//add review
router.post('/:id/review', controller.addReview);

//add movie
router.post('/movie', upload.single('image'), controller.addMovie);

module.exports = router;