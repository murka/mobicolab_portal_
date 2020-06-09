const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const ToolTypesControler = require('../controllers/toolType');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, ToolTypesControler.index)
.post(cors.cors, ToolTypesControler.newDoc)
.delete(cors.cors, ToolTypesControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, ToolTypesControler.getItem)
.patch(cors.cors, ToolTypesControler.patchItem)
.delete(cors.cors, ToolTypesControler.deleteItem);

module.exports = router;