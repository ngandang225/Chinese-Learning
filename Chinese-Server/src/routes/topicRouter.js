const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/TopicController');

router.get('/search', TopicController.getByName);
router.get('/:id', TopicController.getById);
router.get('/book/:id', TopicController.getByBookId);
// router.put('/:id', TopicController.update);
// router.delete('/:id', TopicController.delete);
// router.post('/', TopicController.create);
router.get('/', TopicController.getAll);

module.exports = router;