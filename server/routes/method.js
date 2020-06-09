const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const MethodsControler = require('../controllers/method');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, MethodsControler.index)
.post(cors.cors, MethodsControler.newDoc)
.delete(cors.cors, MethodsControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, MethodsControler.getItem)
.patch(cors.cors, MethodsControler.patchItem)
.delete(cors.cors, MethodsControler.deleteItem);

module.exports = router;