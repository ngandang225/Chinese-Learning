const express = require('express');
const router = express.Router();
const ExerciseController = require('../controllers/ExerciseController');

router.get('/part/:id', ExerciseController.getByPartId);
router.get('/skill/:id', ExerciseController.getBySkillId);
router.get('/:id', ExerciseController.getById);
// router.put('/:id', ExerciseController.update);
// router.delete('/:id', ExerciseController.delete);
// router.post('/', ExerciseController.create);
router.get('/', ExerciseController.getAll);

module.exports = router;