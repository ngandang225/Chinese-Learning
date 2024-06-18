const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/QuestionController');

router.get('/exercise/:id', QuestionController.getByExerciseId);
router.get('/:id', QuestionController.getById);
// router.put('/:id', QuestionController.update);
// router.delete('/:id', QuestionController.delete);
// router.post('/', QuestionController.create);
router.get('/', QuestionController.getAll);

module.exports = router;