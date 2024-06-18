const db = require('../models');

const BookController = {
    getAll: async (req, res) => {
        const books = await db.Book.findAll();
        if (books.length <= 0) {
            res.status(404).json('Not Found!');
        }
        else res.status(200).json(books);
    },

    getById: async (req, res) => {
        const book = await db.Book.findOne({ where: { id: req.params.id } });
        if (book === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(book)
    },

    getByLevelId: async (req, res) => {
        const books = await db.Book.findAll({ where: { levelId: req.params.id } });
        if (books === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(books)
    },
}

module.exports = BookController;