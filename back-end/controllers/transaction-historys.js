const express = require('express');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { TransactionHistory, User, Chapter } = require('../models/db');
const { ErrorResult, Result, PagingResult } = require('../utils/base_response');
const router = express.Router();

router.use((req, res, next) => {
    //phan quyen o day
    next();
});

router.get('/:id', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);

    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';

    let sortColumn = 'id';
    let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }

    const offset = page * pageSize;
    // const limit = parseInt(offset) + parseInt(pageSize);
    const limit = pageSize;

    if (queryString.length <= 2) {
        TransactionHistory.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            TransactionHistory.findAll({
                where: { sellerid: req.params.id},
                offset: offset,
                limit: limit,
                include: [{ model: Chapter, as: 'chapter' },{ model: User, as: 'buyer' }],
            }).then(his => {
                return res.json(PagingResult(his, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    } else { // search
        // conditions
        const whereClause = {
            [Op.or]: [
                { storyname: { [Op.like]: queryString } },
                { description: { [Op.like]: queryString } },
                { copyright: { [Op.like]: queryString } }
            ]
        }

        TransactionHistory.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            TransactionHistory.findAll({
                where: whereClause,
                offset: offset,
                limit: limit
            }).then(his => {
                return res.json(PagingResult(his, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    }
});


module.exports = router;