const express = require('express');
const router = require('express-promise-router')();

const cors = require('./cors');
const authenticate = require('../authenticate');

const PlacesControler = require('../controllers/place');

router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, PlacesControler.index)
.post(cors.cors, PlacesControler.newDoc) 
.delete(cors.cors, PlacesControler.deleteAll);

router.route('/:itemId')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, PlacesControler.getItem)
.patch(cors.cors, PlacesControler.patchItem)
.delete(cors.cors, PlacesControler.deleteItem);

module.exports = router;