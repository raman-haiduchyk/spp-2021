const express = require('express');
const router = express.Router();
const Company = require('../models/db-models').Company;
const { sha3_256 } = require('js-sha3')

router.get('/', async(req, res) => {
    res.render('authorization', { authorized: req.session.companyId });
});

router.get('/logout', async(req, res) => {
    req.session = null;
    res.redirect('/authorization');
});

router.post('/', async(req, res) => {
    if (req.body?.name) {
        await Company.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            description: req.body?.description,
            password: sha3_256(req.body.password)
        })
        .then(company => {
            req.session.companyId = company.id;
            res.redirect('/profile');
        })
        .catch(err => {

        });
        
    } else {
        await Company.findOne({ where: {
            email: req.body.email,
            password: sha3_256(req.body.password)
        }})
        .then(company => { 
            req.session.companyId = company.id;
            res.redirect('/profile');
        })
        .catch(err => {

        });
    }
});



module.exports = router;
