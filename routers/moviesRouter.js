const express = require('express');

const router = express.Router();

//movies controller
const controller = require('../controllers/moviesController');

//index
router.get('/', controller.index);

//show
router.get('/:id', controller.show);

module.exports = router;