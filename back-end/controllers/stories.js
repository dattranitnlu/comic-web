const express = require('express');
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
const Op = sequelize.Op;
const { StoryType, Story, Chapter, PurchasedChapter, User } = require('../models/db');
const { ErrorResult, Result, PagingResult } = require('../utils/base_response');
const router = express.Router();
var sto = require('node-persist');


router.use((req, res, next) => {
    //phan quyen o day
    next();
});
router.get('/', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);

    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';

    let sortColumn = 'storyname';
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
        Story.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Story.findAll({
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit,
                include: [{ model: StoryType, as: 'storyType' }]
            }).then(stories => {
                return res.json(PagingResult(stories, {
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

        Story.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Story.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
                include: [{ model: StoryType, as: 'storyType' }]
            }).then(stories => {
                return res.json(PagingResult(stories, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    }
});
// get By UserId
router.get('/getByUserId/:id(\\d+)', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);

    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';

    let sortColumn = 'storyname';
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
        // conditions
        const whereClause = {
            userid: req.params.id
        }

        Story.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Story.findAll({
                where: whereClause,
                order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit,
                include: [{ model: StoryType, as: 'storyType' }]
            }).then(stories => {
                return res.json(PagingResult(stories, {
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
            typeid: req.params.id,
            [Op.or]: [
                { storyname: { [Op.like]: queryString } },
                { description: { [Op.like]: queryString } },
                { copyright: { [Op.like]: queryString } },
            ]
        }

        Story.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Story.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
                include: [{ model: StoryType, as: 'storyType' }]
            }).then(stories => {
                return res.json(PagingResult(stories, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    }
});

router.get('/getStory/:id', (req, res) => {
    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
    const whereClause = {
        typeid: req.params.id,
        [Op.or]: [
            { storyname: { [Op.like]: queryString } },
            { description: { [Op.like]: queryString } },
            { copyright: { [Op.like]: queryString } },
        ]
    }
    Story.findAll(
        {
            where: whereClause
        }
    ).then(stories => {
        return res.json(Result(stories));
    })
})

// router.get('/:id(\\d+)', (req, res) => {
//     Story.findByPk(req.params.id,).then(type => {
//         if (type != null1) {
//             res.json(Result(type));
//         } else {
//             res.status(404).json(ErrorResult(404, 'Not Found'));
//         }
//     });
// });

router.get('/:id(\\d+)', (req, res) => {
    Story.findAll(
        {
            where: { storyid: req.params.id },
            include: [{ model: User, as: 'user' }]
        }
    ).then(type => {
        if (type[0] != null) {
            res.json(Result(type[0]));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

// router.post('/', [
//     check('typeid', 'Invalid number').isNumeric(),
//     check('storyname', 'Is required').not().isEmpty(),
// ], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json(ErrorResult(422, errors.array()));
//     }

//     Story.create(req.body).then(type => {
//         res.json(Result(type));
//     }).catch(err => {
//         res.status(500).json(ErrorResult(500, err.errors));
//     });
// });

router.post('/', (req, res) => {
    req.body.imgUrl = sto.getItemSync('img');
    req.destroy.imgurl;
    console.log(req.body);
    Story.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        res.status(500).json(ErrorResult(500, err.errors));
    });
})

// router.put('/:id(\\d+)', [
//     check('typeid', 'Invalid number').isNumeric(),
//     check('storyname', 'Is required').not().isEmpty(),
// ], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json(ErrorResult(422, errors.array()));
//     }

//     Story.findByPk(req.params.id).then(type => {
//         if (type != null) {
//             type.update({
//                 typeid: req.body.typeid,
//                 storyname: req.body.storyname,
//                 description: req.body.description,
//                 copyright: req.body.copyright
//             }).then(type => {
//                 res.json(Result(type));
//             }).catch(err => {
//                 res.status(500).json(ErrorResult(500, err.errors));
//             });
//         } else {
//             res.status(404).json(ErrorResult(404, 'Not Found'));
//         }
//     });
// });

router.put('/:id(\\d+)', (req, res) => {
    Story.findByPk(req.params.id).then(type => {
        if (type != null) {
            type.update({
                typeid: req.body.typeid,
                storyname: req.body.storyname,
                description: req.body.description,
                copyright: req.body.copyright,
                imgUrl: sto.getItemSync('img')
            }).then(type => {
                res.json(Result(type));
            }).catch(err => {
                res.status(500).json(ErrorResult(500, err.errors));
            });
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
})

router.delete('/:id', (req, res) => {
    Story.destroy({
        where: {
            id: req.params.id
        }
    }).then(type => {
        res.json(Result(type));
    }).catch(err => {
        res.status(500).json(ErrorResult(500, err.errors));
    });
});

// ngăn chặn việc đọc
router.post('/user-story', (req, res) => {
    console.log(req.body);

    // kiểm tra xem chương truyện có bắt trả phí không. nếu không thì hàm sẽ kết thúc tại đây (errorCode = 0)
    Chapter.findAll(
        {
            where: [
                { chapid: req.body.chapid },
                { chapstatus: false }
            ]
        }
    ).then(types => {
        if (types[0] != null) {
            res.json(Result(types[0]));
        }
    });

    // Nếu đây là chương truyện bắt trả phí thì sẽ kiểm tra xem user có phải là tác giả của nó không
    // Nếu có thì hàm sẽ kết thúc tại đây (errorCode = 0)
    Story.findAll(
        {
            where: [
                { userid: req.body.userid },
                { storyid: req.body.storyid }]
        }
    ).then(types => {
        if (types[0] != null) {
            res.json(Result(types[0]));
        }
    });

    // Nếu user không phải là tác giả của chương truyện thì kiểm tra xem user có mua nó chưa.
    // Nếu mua rồi thì trả về errorCode = 0, nếu chưa thì errorCode = 404
    PurchasedChapter.findAll(
        {
            where: [
                { userid: req.body.userid },
                { chapid: req.body.chapid }]
        }
    ).then(types => {
        if (types[0] != null) {
            res.json(Result(types[0]));
        } else {
            res.json(ErrorResult(404, 'Not Found'));
        }
    });
});



module.exports = router;