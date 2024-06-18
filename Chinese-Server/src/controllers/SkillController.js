const db = require('../models');

const SkillController = {
    getAll: async (req, res) => {
        const skills = await db.Skill.findAll();
        if (skills.length <= 0) {
            res.status(404).json('Not Found!');
        }
        else res.status(200).json(skills);
    },

    getById: async (req, res) => {
        const skill = await db.Skill.findOne({ where: { id: req.params.id } });
        if (skill === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(skill)
    },

    getByPartId: async (req, res) => {
        const skills = await db.Skill.findAll({ where: { partId: req.params.id } });
        if (skills === null) {
          res.status(404).json('Not found!');
        }
        else res.status(200).json(skills)
    },
}

module.exports = SkillController;