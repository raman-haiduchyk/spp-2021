const express = require('express');
const Job = require('../models/db-models').Job;
const Company = require('../models/db-models').Company;
const router = express.Router();

router.get('/', async(req, res, next) => {
    const company = await Company.findByPk(req.session.companyId)
    .catch(err => {

    });
    await Job.findAll({ include: Company, where: {
      companyId: req.session.companyId
    }})
    .then(jobs => {
      res.render('profile', { jobs: jobs, company: company, authorized: req.session.companyId });
    })
    .catch(err => {
      console.log(err)
    });
});

router.post('/', async(req, res, next) => {
  await Job.create({ 
    name: req.body.name, 
    requirments: req.body.requirments,
    responsibilities: req.body.responsibilities,
    offers: req.body.offers,
    salary: parseInt(req.body.salary),
    specialization: req.body.specialization,
    companyId: req.session.companyId
  })
  .then(job => {
    res.redirect('/profile');
  })
  .catch(err => {
    console.log(err)
  });
});

router.post('/:id', async(req, res, next) => {
  await Job.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(jobs => {
    res.redirect('/profile');
  })
  .catch(err => {
    console.log(err)
  });
});

module.exports = router;
