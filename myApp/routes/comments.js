const express = require('express');
const router = express.Router();
const Comment = require('../models/initModels').FunficComments;
const Rating = require('../models/initModels').FunficRatings;
const User = require('../models/initModels').User;
const jwtHandler = require('../public/tokenHandler');


router.get('/:id', async(req, res) => {
    let id = Number(req.params["id"]);
    if (isNaN(id)) return res.sendStatus(400);
    let comments = await Comment.findAll({
        where: { funficId: id },
        include: User
    });
    if (!comments) return res.send([]);
    let mappedComments = comments.map(comment => {
        return {author: comment.user.name, text: comment.text, createdAt: comment.createdAt}
    });
    return res.status(200).send(mappedComments);
});

module.exports = router;