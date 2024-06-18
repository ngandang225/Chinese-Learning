const express = require('express');
const router = express.Router();
const AnswerController = require('../controllers/AnswerController');

router.get('/exercise/:id', AnswerController.getByExerciseId);
router.get('/question/:id', AnswerController.getByQuestionId);
router.get('/:id', AnswerController.getById);
// router.put('/:id', AnswerController.update);
// router.delete('/:id', AnswerController.delete);
// router.post('/', AnswerController.create);
router.get('/', AnswerController.getAll);

module.exports = router;