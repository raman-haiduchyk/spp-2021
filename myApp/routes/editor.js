const express = require('express');
const { Op } = require("sequelize");
const User = require('../models/initModels').User;
const Funfic = require('../models/initModels').Funfic;
const Chapter = require('../models/initModels').Chapter;
const Rating = require('../models/initModels').FunficRatings;
const Comment = require('../models/initModels').FunficComments;
const router = express.Router();

router.put('/', async(req, res) => {
    if (!req.name || !req.body.name) return res.sendStatus(400);
    const user = await User.findOne({where: {name: req.name}});
    if (!user) return res.sendStatus(403);
    const funfic = await Funfic.create({
        author: user.name,
        userId: user.id,
        name: req.body.name
    });
    if(!funfic) return res.sendStatus(500);
    return res.status(200).send({id: funfic.id});
});

router.post('/:id', async(req, res) => {
    let id = Number(req.params["id"]);
    if (isNaN(id) || !req.name || !req.body.name) return res.sendStatus(400);

    const funfic = await Funfic.findByPk(id);
    if (!funfic) return res.sendStatus(404);

    const user = await User.findOne({where: {name: req.name}});
    if (!user) return res.sendStatus(403);
    
    if (funfic.userId != user.id) return res.sendStatus(403);

    await Funfic.update(
        {
            name: req.body.name,
            genre: req.body?.genre,
            shortDescription: req.body?.shortDescription,
        },
        { where: {id: funfic.id} }
    );

    await Chapter.destroy({where: {funficId: funfic.id}})
    
    if (req.body.chapters)
        for(const chapter of req.body.chapters){
            await Chapter.create({
                name: chapter.name,
                text: chapter.text,
                number: chapter.number,
                funficId: funfic.id
            });
        };

    return res.status(200).send({status: "OK"});
});

router.delete('/:id', async(req, res) => {
    let id = Number(req.params["id"]);
    if (isNaN(id) || !req.name) return res.sendStatus(400);

    const funfic = await Funfic.findByPk(id);
    if (!funfic) return res.sendStatus(404);

    const user = await User.findOne({where: {name: req.name}});
    if (!user) return res.sendStatus(403);
    
    if (funfic.userId != user.id) return res.sendStatus(403);

    await Funfic.destroy({where: {id: funfic.id}});
    res.status(200).send({status: "OK"});
});

router.post('/rating/:id', async(req, res) => {
    let id = Number(req.params["id"]);
    if (isNaN(id) || !req.name || !req.body.stars) return res.sendStatus(400);

    const user = await User.findOne({where: {name: req.name}});
    if (!user) return res.sendStatus(403);

    const funfic = await Funfic.findByPk(id);
    if (!funfic) return res.sendStatus(404);

    let rating = await Rating.findOne({
        where: {
            userId: user.id,
            funficId: funfic.id
        }
    });

    if (rating) {
        funfic.rating = (funfic.rating * funfic.scoreCount - rating.starsCount + req.body.stars) / funfic.scoreCount;
        await Funfic.update(
            { rating: funfic.rating }, 
            { where: { id: funfic.id } }
        );
        await Rating.update(
            { starsCount: req.body.stars }, 
            { where: { id: rating.id } }
        );
    } else {
        rating = await Rating.create({
            userId: user.id,
            funficId: funfic.id,
            starsCount: req.body.stars
        });
        funfic.rating = (funfic.rating * funfic.scoreCount + req.body.stars) / (funfic.scoreCount + 1);
        await Funfic.update(
            { 
                rating: funfic.rating,
                scoreCount: funfic.scoreCount + 1
            }, 
            { where: { id: funfic.id } }
        );
    }

    return res.status(200).send({rating: funfic.rating});
});

router.put('/comments/:id', async(req, res) => {
    let id = Number(req.params["id"]);
    if (isNaN(id) || !req.name || !req.body.text) return res.sendStatus(400);

    const user = await User.findOne({where: {name: req.name}});
    if (!user) return res.sendStatus(403);

    const funfic = await Funfic.findByPk(id);
    if (!funfic) return res.sendStatus(404);

    const comment = await Comment.create({
        funficId: funfic.id,
        userId: user.id,
        text: req.body.text
    });

    if(!comment) return res.sendStatus(500);

    return res.status(200).send({
        author: user.name,
        text: comment.text,
        createdAt: comment.createdAt
    });

});

module.exports = router;