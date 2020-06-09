const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const EnvironmentalEngineersControler = require('../controllers/environmentalEngineer');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, EnvironmentalEngineersControler.index)
.post(cors.cors, EnvironmentalEngineersControler.newDoc)
.delete(cors.cors, EnvironmentalEngineersControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, EnvironmentalEngineersControler.getItem)
.patch(cors.cors, EnvironmentalEngineersControler.patchItem)
.delete(cors.cors, EnvironmentalEngineersControler.deleteItem);

module.exports = router;