const db = require('../models');

const ExerciseController = {
    getAll: async (req, res) => {
        const exercises = await db.Exercise.findAll();
        if (exercises.length <= 0) {
            res.status(404).json('Not Found!');
        }
        else res.status(200).json(exercises);
    },

    getById: async (req, res) => {
        const exercise = await db.Exercise.findOne({ where: { id: req.params.id } });
        if (exercise === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(exercise)
    },

    getByPartId: async (req, res) => {
        const exercises = await db.Exercise.findAll({ where: { partId: req.params.id } });
        if (exercises === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(exercises)
    },

    getBySkillId: async (req, res) => {
        const exercise = await db.Exercise.findAll({ where: { skillId: req.params.id } });
        if (exercise === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(exercise)
    },
}

module.exports = ExerciseController;