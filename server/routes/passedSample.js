const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const PassedSamplesControler = require('../controllers/passedSample');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, PassedSamplesControler.index)
.post(cors.cors, PassedSamplesControler.newDoc)
.delete(cors.cors, PassedSamplesControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, PassedSamplesControler.getItem)
.patch(cors.cors, PassedSamplesControler.patchItem)
.delete(cors.cors, PassedSamplesControler.deleteItem);

module.exports = router;