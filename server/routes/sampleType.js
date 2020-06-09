const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const SampleTypesControler = require('../controllers/sampleType');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, SampleTypesControler.index)
.post(cors.cors, SampleTypesControler.newDoc)
.delete(cors.cors, SampleTypesControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, SampleTypesControler.getItem)
.patch(cors.cors, SampleTypesControler.patchItem)
.delete(cors.cors, SampleTypesControler.deleteItem);

module.exports = router;