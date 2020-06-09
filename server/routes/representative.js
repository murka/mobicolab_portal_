const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const RepresentativesControler = require('../controllers/representative');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, RepresentativesControler.index)
.post(cors.cors, RepresentativesControler.newDoc)
.delete(cors.cors, RepresentativesControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, RepresentativesControler.getItem)
.patch(cors.cors, RepresentativesControler.patchItem)
.delete(cors.cors, RepresentativesControler.deleteItem);

module.exports = router;