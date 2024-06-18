const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/:id', UserController.getById);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

router.put('/:id', UserController.update);
// router.delete('/:id', UserController.delete);
router.post('/', UserController.create);
router.get('/', UserController.getAll);

module.exports = router;