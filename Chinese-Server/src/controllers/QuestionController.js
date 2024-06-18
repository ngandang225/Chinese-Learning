const db = require('../models');

const QuestionController = {
    getAll: async (req, res) => {
        const questions = await db.Question.findAll();
        if (questions.length <= 0) {
            res.status(404).json('Not Found!');
        }
        else res.status(200).json(questions);
    },

    getById: async (req, res) => {  
        const question = await db.Question.findOne({ where: { id: req.params.id} });
        if (question === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(question)
    },

    getByExerciseId: async (req, res) => {
        const questions = await db.Question.findAll({ where: { exerciseId: req.params.id } });
        if (questions === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(questions)
    },
}

module.exports = QuestionController;