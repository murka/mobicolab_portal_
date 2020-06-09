const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const GCustomersController = require('../controllers/gcustomers');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, GCustomersController.index)
.post(cors.cors, GCustomersController.newGCustomer)
.delete(cors.cors, GCustomersController.deleteAll);

router.route('/:gcustomerId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, GCustomersController.getItem)
.patch(cors.cors, GCustomersController.patchItem);

module.exports = router;