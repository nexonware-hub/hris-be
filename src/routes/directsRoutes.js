const express = require('express');
const router = express.Router();
const directsController = require('../controllers/directsController');

router.post('/getdirects', directsController.getDirects);
router.put('/', directsController.updateDirects);

module.exports = router;
