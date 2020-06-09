const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const ActController = require('../controllers/acts');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, ActController.index)
.post(cors.cors, ActController.newAct)
.delete(cors.cors, ActController.deleteAll);

router.route('/:actId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, ActController.getAct)
.put(cors.cors, ActController.replaceAct)
.patch(cors.cors, ActController.updateAct)
.delete(cors.cors, ActController.deleteAct);

router.route('/:actId/comments')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.post(cors.cors, ActController.postComment);

module.exports = router;