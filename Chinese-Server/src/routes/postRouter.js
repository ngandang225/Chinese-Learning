const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const uploadImage = require('../middlewares/uploadImage');
const verifyToken = require('../middlewares/verifyToken');
  
router.get('/available', PostController.getAllAvailble);
router.put('/:id/delete', verifyToken.authenToken, PostController.delete);
router.put('/:id/restore', verifyToken.authenToken, PostController.restore);

router.put('/:id', verifyToken.authenToken, uploadImage.single('image'), PostController.update);
router.delete('/:id', verifyToken.authenToken, PostController.destroy);
router.post('/', verifyToken.authenToken, uploadImage.single('image'), PostController.create);
router.get('/:id', PostController.getById);
router.get('/', PostController.getAll);

module.exports = router;