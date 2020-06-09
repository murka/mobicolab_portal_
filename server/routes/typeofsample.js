const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const TypeOfSampleControler = require('../controllers/typeofsample');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, TypeOfSampleControler.index)
.post(cors.cors, TypeOfSampleControler.newType)
.delete(cors.cors, TypeOfSampleControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.post(cors.cors, TypeOfSampleControler.postTypes)
.patch(cors.cors, TypeOfSampleControler.patchItem)
.delete(cors.cors, TypeOfSampleControler.deleteItem);


module.exports = router;