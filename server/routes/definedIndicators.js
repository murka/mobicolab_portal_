const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const definedIndicatorsControler = require('../controllers/definedIndicators');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, definedIndicatorsControler.index)
.post(cors.cors, definedIndicatorsControler.newDoc)
.delete(cors.cors, definedIndicatorsControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, definedIndicatorsControler.getItem)
.patch(cors.cors, definedIndicatorsControler.patchItem)
.delete(cors.cors, definedIndicatorsControler.deleteItem);

router.route('/many')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.post(cors.cors, definedIndicatorsControler.newDocs);

module.exports = router;