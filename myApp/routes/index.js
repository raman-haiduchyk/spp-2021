const express = require('express');
const Job = require('../models/db-models').Job;
const Company = require('../models/db-models').Company;
const { Op } = require("sequelize");
const router = express.Router();

router.get('/', async(req, res, next) => {
    await Job.findAll({ include: Company })
      .then(jobs=>{
        jobs.forEach(element => {
          let vacancy = {
            id: element.id,
            name: element.name,
            salary: element.salary,
            requirments: element.requirments,
            responsibilities: element.responsibilities,
            offers: element.offers,
            specialization: element.specialization,
            createdAt: element.createdAt,
            company: {
              id: element.companyId,
              name: element.company.name,
              phone: element.company.phone,
              email: element.company.email,
              home_page: element.company.home_page,
              description: element.company.description
            }
          }
          console.log(vacancy)
        });
        res.render('index', { jobs: jobs, authorized: req.session.companyId });
      })
      .catch(err => {
        console.log(err)
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
      res.render('index', { jobs: jobs, authorized: req.session.companyId });
    })
    .catch(err => {
      console.log(err)
    });
});


router.get('/:id', async(req, res, next) => {
    await Job.findByPk(parseInt(req.params.id), {include: Company})
      .then(job=>{
        res.render('item', { job: job, authorized: req.session.companyId });
      })    
      .catch(err => {
        console.log(err)
      });
});

module.exports = router;
