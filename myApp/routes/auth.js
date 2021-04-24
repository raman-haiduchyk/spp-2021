const express = require('express');
const sha = require('js-sha3');
const User = require('../models/initModels').User;
const jwtHandler = require('../public/tokenHandler');
const Op = require('sequelize').Op;
const router = express.Router();

router.post('/login', async(req, res) => {
    if(!req.body || !req.body.userName || !req.body.password) return res.sendStatus(400);
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { name: req.body.userName }
            ]
        }
    });

    if(!user) {
        return res.status(401).send({isAuthSuccessful: false, errorMessage: 'No such user!', tokens: null});
    }

    if(user.hashPassword !== sha.sha3_256(req.body.password)){
        return res.status(401).send({isAuthSuccessful: false, errorMessage: 'Wrong password!', tokens: null});
    }

    const accessToken = jwtHandler.generateAccessToken(user.name);
    const refreshToken = jwtHandler.generateRefreshToken();

    let date = new Date();

    await User.update(
        { 
            refreshToken: refreshToken,
            refreshTokenExpiryTime: date.setDate(date.getDate() + 15) // expiry in 15 days
        }, 
        {
            where: {
              id: user.id
            }
        }
    )
    .then(_ => {
        return res.status(200).send({isAuthSuccessful: true, errorMessage: null, tokens: {accessToken: accessToken, refreshToken: refreshToken}});
    })
    .catch(err => {
        return res.status(500).send({isAuthSuccessful: true, errorMessage: "Cannot update refresh token!", tokens: {accessToken: accessToken, refreshToken: null}});
    });
});

router.put('/register', async(req, res) => {
    if(!req.body || !req.body.userName || !req.body.password || !req.body.email) {
        return res.status(400).send({isSuccessfulRegistration: false, errors: ['Login, email and password are required!']});
    }

    const user = await User.findOne({
        where: {
            [Op.or]: [
                { name: req.body.userName },
                { email: req.body.email }
            ]
        }
    });

    if (user) return res.status(400).send({isSuccessfulRegistration: false, errors: ['User with such name or email already exists!']});

    await User.create({name: req.body.userName, email: req.body.email, hashPassword: sha.sha3_256(req.body.password)})
    return res.status(200).send({isSuccessfulRegistration: true, errors: []});
});

router.post('/refresh', async(req, res) => {
    if(!req.body || !req.body.refreshToken) return res.sendStatus(400);

    const oldAccessToken = jwtHandler.getAccessTokenFromHeader(req.headers);
    if (!oldAccessToken) res.sendStatus(401);

    const username = jwtHandler.decodeAccessToken(oldAccessToken).name;
    if (!username) res.sendStatus(401);

    const user = await User.findOne({
        where: {
            [Op.or]: [
                {name:  username}
            ]
        }
    });

    if(!user || user.refreshToken !== req.body.refreshToken || user.refreshTokenExpiryTime < new Date()) return res.sendStatus(401);

    const accessToken = jwtHandler.generateAccessToken(user.name);
    const refreshToken = jwtHandler.generateRefreshToken();

    let date = new Date();

    await User.update(
        { 
            refreshToken: refreshToken,
            refreshTokenExpiryTime: date.setDate(date.getDate() + 15) // expiry in 15 days
        }, 
        {
            where: {
                id: user.id
            }
        }
    )
    .then(_ => {
        return res.status(200).send({accessToken: accessToken, refreshToken: refreshToken});
    })
    .catch(err => {
        return res.sendStatus(401);
    });
});

module.exports = router;
