const express = require('express');
const router = express.Router();
const User = require('../models/initModels').User;
const Funfic = require('../models/initModels').Funfic;
const Rating = require('../models/initModels').FunficRatings;

router.get('/', async(req, res) => {
    if (!req.name) return res.sendStatus(400);
    const user = await User.findOne({
        where: { name: req.name }
    });
    if(!user) return res.sendStatus(404);
    const profile = {
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
    }
    return res.status(200).send(profile);
});

router.post('/', async(req, res) => {
    if (!req.name) return res.sendStatus(400);
    await User.update(
        {
            firstName: req.body?.firstName,
            lastName: req.body?.lastName,
            phone: req.body?.phone
        },
        
        {
            where:{ name: req.name }
        }
    )
    .then(_ => {
        return res.status(200).send({ status: 'OK'});
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send({ status: 'Server error'});
    });
});

router.get('/my', async(req, res) => {
    if (!req.name) return res.sendStatus(400);
    const funfics = await Funfic.findAll({
        where: {author: req.name}
    });
    if(!funfics) return res.send([]);
    return res.status(200).send(funfics);
});

router.get('/rating/:id', async(req, res, next) => {
    let id = Number(req.params["id"]);
    if (isNaN(id) || !req.name) return res.sendStatus(400);
    const user = await User.findOne({where: {name: req.name}});
    if (!user) return res.sendStatus(401);
    const rating = await Rating.findOne({
        where: {userId: user.id, funficId: id}
    });
    let stars = 0;
    if(rating) stars = rating.starsCount;
    return res.status(200).send({rating: stars});
});

module.exports = router;
