const express = require('express');
const Job = require('../models/db-models').Job;
const Company = require('../models/db-models').Company;
const router = express.Router();


router.get('/', async(req, res, next) => {
    await Job.findAll({ include: Company })
      .then(jobs=>{
        res.render('index', { jobs: jobs });
      })
      .catch(err => {

      });
});


router.get('/:id', async(req, res, next) => {
 
    await Job.findByPk(parseInt(req.params.id), {include: Company})
      .then(job=>{
        res.render('item', { job: job });
      })    
      .catch(err => {

      });
});

module.exports = router;
