const express = require('express');
const router = express.Router();
const PartController = require('../controllers/PartController');

router.get('/topic/:id', PartController.getByTopicId);
router.get('/:id', PartController.getById);
// router.put('/:id', PartController.update);
// router.delete('/:id', PartController.delete);
// router.post('/', PartController.create);
router.get('/', PartController.getAll);

module.exports = router;