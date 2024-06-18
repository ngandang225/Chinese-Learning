const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.get('/level/:id', BookController.getByLevelId);
router.get('/:id', BookController.getById);
// router.put('/:id', BookController.update);
// router.delete('/:id', BookController.delete);
// router.post('/', BookController.create);
router.get('/', BookController.getAll);

module.exports = router;