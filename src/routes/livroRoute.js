const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

router.get('/', livroController.getAllBooks);
router.get('/:id', livroController.getBookById);
router.post('/', livroController.createBook);
router.put('/:id', livroController.updateBook);
router.delete('/:id', livroController.deleteBook);

module.exports = router;
