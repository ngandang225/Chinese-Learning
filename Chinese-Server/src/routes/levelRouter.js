const express = require('express');
const router = express.Router();
const LevelController = require('../controllers/LevelController');

router.get('/:id', LevelController.getById);
// router.put('/:id', LevelController.update);
// router.delete('/:id', LevelController.delete);
// router.post('/', LevelController.create);
router.get('/', LevelController.getAll);

module.exports = router;