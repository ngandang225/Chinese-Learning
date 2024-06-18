const express = require('express');
const router = express.Router();
const SkillController = require('../controllers/SkillController');

router.get('/part/:id', SkillController.getByPartId);
router.get('/:id', SkillController.getById);
// router.put('/:id', SkillController.update);
// router.delete('/:id', SkillController.delete);
// router.post('/', SkillController.create);
router.get('/', SkillController.getAll);

module.exports = router;