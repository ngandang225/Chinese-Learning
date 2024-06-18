const db = require('../models');
const { Op } = require('sequelize');

const TopicController = {
    getAll: async (req, res) => {
        const topics = await db.Topic.findAll();
        if (topics.length <= 0) {
            res.status(404).json('Not Found!');
        }
        res.status(200).json(topics);
    },

    getById: async (req, res) => {
        const topic = await db.Topic.findOne({ where: { id: req.params.id } });
        if (topic === null) {
          res.status(404).json('Not found!');
        }
        res.status(200).json(topic)
    },

    getByName: async (req, res) => {
      try {
        const topics = await db.Topic.findAll({ where: { name: { [Op.like]: `%${req.query.q}%` } } });
        if (topics.length <= 0) {
          return res.status(404).json('Not found!');
        }
    
        const bookIds = topics.map(topic => topic.bookId);
        const books = await db.Book.findAll({ where: { id: bookIds }, attributes: ['id','name', 'image'] });
        const topicsWithBooks = topics.map(topic => {
          const book = books.find(book => {
            return book.id === topic.bookId
          });
        
          return {
            ...topic.toJSON(),
            bookId: book || null
          };
        });
        res.status(200).json(topicsWithBooks);
      } catch (err) {
        console.log('Error getting topics:', err);
        res.status(500).json({
          message: 'Server error: ' + err.message,
          error: err
        });
      }
    },

    getByBookId: async (req, res) => {
        const topics = await db.Topic.findAll({ where: { bookId: req.params.id } });
        if (topics === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(topics)
    },
}

module.exports = TopicController;