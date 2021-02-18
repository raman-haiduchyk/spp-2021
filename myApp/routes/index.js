const express = require('express');
const Job = require('../models/db-models').Job;
const Company = require('../models/db-models').Company;
const router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
  try {
    Job.findAll({ include: Company }).then(jobs=>{
      res.render('index', { jobs: jobs });
    });
    
  } catch(err) {

  }
});

module.exports = router;
