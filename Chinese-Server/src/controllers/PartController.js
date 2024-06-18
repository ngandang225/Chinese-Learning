const db = require('../models');

const PartController = {
    getAll: async (req, res) => {
        const parts = await db.Part.findAll();
        if (parts.length <= 0) {
            res.status(404).json('Not Found!');
        }
        else res.status(200).json(parts);
    },

    getById: async (req, res) => {
        const part = await db.Part.findOne({ where: { id: req.params.id } });
        if (part === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(part)
    },

    getByTopicId: async (req, res) => {
        const parts = await db.Part.findAll({ where: { topicId: req.params.id } });
        if (parts === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(parts)
    },
}

module.exports = PartController;