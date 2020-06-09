const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const LabControler = require('../controllers/labs');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, LabControler.index)
.post(cors.cors, LabControler.newLab)
.delete(cors.cors, LabControler.deleteAll);

router.route('/:labId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, LabControler.getItem)
.patch(cors.cors, LabControler.patchItem);


module.exports = router;