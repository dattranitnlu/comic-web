const express = require('express');
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
const Op = sequelize.Op;
const { PurchasedChapter } = require('../models/db');
const { ErrorResult, Result, PagingResult } = require('../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    //phan quyen o day
    next();
});

router.post('/purchase-exists', (req, res) => {
    
    PurchasedChapter.findOne(
        {where : [
            {userid: req.body.userid},
            {chapid: req.body.chapid}]
        }
        ).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

module.exports = router;