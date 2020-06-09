const express = require('express');
const router = require('express-promise-router')();

const Act = require('../models/acts');
const Customer = require('../models/customers');
const GCustomer = require('../models/gcustomers');
const Labs = require('../models/labs');

const cors = require('./cors');
const authenticate = require('../authenticate');

const GoalsControler = require('../controllers/goal');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, GoalsControler.index)
.post(cors.cors, GoalsControler.newDoc)
.delete(cors.cors, GoalsControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, GoalsControler.getItem)
.patch(cors.cors, GoalsControler.patchItem)
.delete(cors.cors, GoalsControler.deleteItem);

module.exports = router;