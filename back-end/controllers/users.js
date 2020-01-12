const express = require('express');
const jwt = require('jsonwebtoken');
const helper = require('../utils/helper');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { User } = require('../models/db');
const { ErrorResult, Result } = require('../utils/base_response');
const router = express.Router();

// {
//     "username": "linh920",
//     "password": "123",
//      "fullname": "tran huu linh",
//      "birthday": "10-07-1996",
//      "coin": 10,
//      "email":"linh920@mail.com"
//   }

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    User.findAll().then(users => {
        res.send(Result(users));
    })
});

router.get('/:id(\\d+)', (req, res) => {
    User.findByPk(req.params.id).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found'));
        }
    });
});

router.post('/', (req, res) => {
    console.log('da vao');

    User.findAll({
        where: {[Op.or]: [
                { username: { [Op.like]: req.body.username } },
                { email: { [Op.like]: req.body.email } }
            ]
        }
    }).then(users => {
        if (users[0] != null) {
            res.status(401).json(ErrorResult(401, 'username does existed'));
        } else {
            req.body.password = helper.hash(req.body.password);
            User.create(req.body).then(type => {
                res.json(Result(type));
            }).catch(err => {
                return res.status(400).json(ErrorResult(404, err.errors));
            });
        }
    })

});

router.post('/login', (req, res) => {
    console.log('req.body: ' + req.body.username);

    User.findAll({
        where: {
            username: req.body.username,
            password: helper.hash(req.body.password)
        }
    }).then(users => {
        if (users[0] != null) {
            const token = jwt.sign({ userid: users[0].userid, username: users[0].username }, helper.appKey, { expiresIn: '1h' });
            res.json(Result({
                id: users[0].id,
                username: users[0].username,
                fullname: users[0].fullname,
                coin: users[0].coin,
                token: token,
            }));
        } else {
            res.status(401).json(ErrorResult(401, 'Invalid username or password'));
        }
    });
});

router.put('/:id(\\d+)', (req, res) => {
    User.findByPk(req.params.id).then(type => {
        if (type != null) {
            type.update({
                password: helper.hash(req.body.confirmPassword)
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

module.exports = router;