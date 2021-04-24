const express = require('express');
const { Op } = require('sequelize');
const Funfic = require('../models/initModels').Funfic;
const Chapter = require('../models/initModels').Chapter;
const router = express.Router();

router.get('/', async(req, res) => {
    const funfics = await Funfic.findAll();
    if (!funfics) return res.send([]);
    return res.status(200).send(funfics);
});

router.get('/:id', async(req, res) => {
    let id = Number(req.params["id"]);
    if (isNaN(id)) return res.sendStatus(400);
    let funfic = await Funfic.findByPk(id);
    if (!funfic) return res.sendStatus(404);
    const chapters = await Chapter.findAll({
        where: {funficId: funfic.id}
    });
    if (!chapters) funfic.dataValues.chapters = []
    else funfic.dataValues.chapters = chapters;
    return res.status(200).send(funfic.dataValues);  
});

module.exports = router;
