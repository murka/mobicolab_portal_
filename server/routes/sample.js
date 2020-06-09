const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const SamplesControler = require('../controllers/sample');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, SamplesControler.index)
.post(cors.cors, SamplesControler.newDoc)
.delete(cors.cors, SamplesControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, SamplesControler.getItem)
.patch(cors.cors, SamplesControler.patchItem)
.delete(cors.cors, SamplesControler.deleteItem);

module.exports = router;