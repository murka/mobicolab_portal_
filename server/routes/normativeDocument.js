const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const NormativeDocumentsControler = require('../controllers/normativeDocument');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, NormativeDocumentsControler.index)
.post(cors.cors, NormativeDocumentsControler.newDoc)
.delete(cors.cors, NormativeDocumentsControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, NormativeDocumentsControler.getItem)
.patch(cors.cors, NormativeDocumentsControler.patchItem)
.delete(cors.cors, NormativeDocumentsControler.deleteItem);

module.exports = router;