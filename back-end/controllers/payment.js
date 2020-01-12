const express = require('express');
const sequelize = require('sequelize');
const { PaymentHistory, User } = require('../models/db');
const Op = sequelize.Op;
const { ErrorResult, Result, PagingResult } = require('../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    //phan quyen o day
    next();
});

// {
// 	"userid":1,
// 	"coin":20,
// 	"payerEmail":"linh@mail.cim",
// 	"payValue":"20 USD",
// 	"payDate":"10-10-2019"
//  "payStatus: false"
// }

router.get('/', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);

    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';

    let sortColumn = 'userid';
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
        PaymentHistory.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            PaymentHistory.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit,
                include: [{ model: User, as: 'user' }]
            }).then(payment => {
                return res.json(PagingResult(payment, {
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

        PaymentHistory.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            PaymentHistory.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
                // include: [{ model: StoryType, as: 'storyType' }]
            }).then(payment => {
                return res.json(PagingResult(payment, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    }
});
// ---------------------------------------------------------------------------
router.post('/', (req, res) => {
    PaymentHistory.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        res.status(500).json(ErrorResult(500, err.errors));
    });
});
// ---------------------------------------------------------------------------
router.put('/set-status/:id(\\d+)', (req, res) => {
    PaymentHistory.findByPk(req.params.id).then(type => {
        if (type != null) {
            type.update({
                payStatus: req.body.payStatus
            }).then(type => {

                // update coin (cộng số xu user có với xu mua thêm)
                User.findByPk(req.body.userid).then(user => {
                    if (user != null) {
                        user.update({
                            coin: req.body.coin
                        }).then(user => {
                            console.log('-----------------------------------' + req.body.coin);
                            
                            res.json(Result(user));
                        });
                    }
                }).catch(err => {
                    res.status(500).json(ErrorResult(500, err.errors));
                });

            }).catch(err => {
                res.status(500).json(ErrorResult(500, err.errors));
            });
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
})

module.exports = router;