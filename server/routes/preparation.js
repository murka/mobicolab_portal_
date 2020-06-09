const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const PreparationsControler = require('../controllers/preparation');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, PreparationsControler.index)
.post(cors.cors, PreparationsControler.newDoc)
.delete(cors.cors, PreparationsControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, PreparationsControler.getItem)
.patch(cors.cors, PreparationsControler.patchItem)
.delete(cors.cors, PreparationsControler.deleteItem);

module.exports = router;