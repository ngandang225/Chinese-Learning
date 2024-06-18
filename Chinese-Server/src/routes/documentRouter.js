const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/DocumentController');

router.get('/:id', DocumentController.getById);
router.put('/:id', DocumentController.update);
router.delete('/:id', DocumentController.delete);
router.post('/', DocumentController.create);
router.get('/', DocumentController.getAll);

module.exports = router;