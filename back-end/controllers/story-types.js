const express = require('express');
const { StoryType } = require('../models/db');
const { ErrorResult, Result } = require('../utils/base_response');
const router = express.Router();
router.use((req, res, next) => {
    //phan quyen o day
    next();
});
router.get('/', (req, res) => {
    StoryType.findAll().then(types => {
        res.json(Result(types));
    });
});

router.get('/:id(\\d+)', (req, res) => {
    StoryType.findByPk(req.params.id).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

router.post('/', (req, res) => {
    StoryType.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        res.status(400).json(ErrorResult(400, err.errors));
    });
});

router.put('/:id(\\d+)', (req, res) => {
    StoryType.findByPk(req.params.id).then(type => {
        if (type != null) {
            type.update({
                typename: req.body.typename
            }).then(type => {
                res.json(Result(type));
            }).catch(err => {
                res.status(400).json(ErrorResult(400, err.errors));
            });
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

router.delete('/:id', (req, res) => {
    StoryType.destroy({
        where: {
            id: req.params.id
        }
    }).then(type => {
        res.json(Result(type));
    }).catch(err => {
        res.status(500).json(ErrorResult(500, err.errors));
    });
});
module.exports = router;