const db = require('../models');

const LevelController = {
    getAll: async (req, res) => {
        const levels = await db.Level.findAll();
        if (levels.length <= 0) {
            res.status(404).json('Not Found!');
        }
        else res.status(200).json(levels);
    },

    getById: async (req, res) => {  
        const level = await db.Level.findOne({ where: { id: req.params.id} });
        if (level === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(level)
    },
}

module.exports = LevelController;