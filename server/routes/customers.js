const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const CustomersController = require('../controllers/customers');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, CustomersController.index)
.post(cors.cors, CustomersController.newCustomer)
.delete(cors.cors, CustomersController.deleteAll);

router.route('/:customerId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, CustomersController.getCustomer)
.patch(cors.cors, CustomersController.patchCustomer);

module.exports = router;