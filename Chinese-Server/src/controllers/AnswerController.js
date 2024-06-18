const db = require('../models');

const AnswerController = {
    getAll: async (req, res) => {
        const answers = await db.Answer.findAll();
        if (answers.length <= 0) {
            res.status(404).json('Not Found!');
        }
        else res.status(200).json(answers);
    },

    getById: async (req, res) => {  
        const answer = await db.Answer.findOne({ where: { id: req.params.id} });
        if (answer === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(answer)
    },

    getByExerciseId: async (req, res) => {
        const answers = await db.Answer.findAll({ where: { exerciseId: req.params.id } });
        if (answers === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(answers)
    },

    getByQuestionId: async (req, res) => {
        const answers = await db.Answer.findAll({ where: { questionId: req.params.id } });
        if (answers === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(answers)
    },
    
}

module.exports = AnswerController;