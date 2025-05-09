const express = require('express');

const router = express.Router();

//index
router.get('/', index);

//show
router.get('/:id', show);