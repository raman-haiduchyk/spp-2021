const express = require('express');
const Job = require('../models/db-models').Job;
const Company = require('../models/db-models').Company;
const { Op } = require("sequelize");
const router = express.Router();

router.get('/', async(req, res, next) => {
    await Job.findAll({ include: Company })
      .then(jobs=>{
        res.render('index', { jobs: jobs });
      })
      .catch(err => {

      });
});


router.post('/', async(req, res, next) => {

  console.log(req.body)
  whereParam = req.body?.specialization 
    ?{ 
      specialization: {[Op.or] : [req.body.specialization]}, 
      salary: {[Op.gt] : parseInt(req.body.minimum)}
    }
    :{
      salary: {[Op.gt] : parseInt(req.body.minimum)}
    }



  await Job.findAll({ 
    include: Company, 
    where: whereParam
  })
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
