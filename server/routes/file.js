const express = require('express');
const router = require('express-promise-router')();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage });

const cors = require('./cors');
const authenticate = require('../authenticate');

const DocController = require('../controllers/docs');


router.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); console.log('body', req.body); })
.get(cors.cors, DocController.allDocs)
.post(cors.cors, DocController.downloadDoc);

router.route('/:actId')
.options(cors.cors, (req, res) => { res.sendStatus(200); console.log('body', req.body); })
.get(cors.cors, DocController.downloadDoc)
.post(cors.cors, upload.single('upload'), DocController.uploadDoc);

router.route('/scanAct/:actId')
.options(cors.cors, (req, res) => { res.sendStatus(200); console.log('body', req.body); })
.get(cors.cors, DocController.downloadScan)
.post(cors.cors, upload.single('upload'), DocController.uploadScanAct);

router.route('/protocol/:actId')
.options(cors.cors, (req, res) => { res.sendStatus(200); console.log('body', req.body); })
.get(cors.cors, DocController.downloadProtocol)
.post(cors.cors, upload.single('upload'), DocController.uploadProtocol);

router.route('/protocolFinal/:actId')
.options(cors.cors, (req, res) => { res.sendStatus(200); console.log('body', req.body); })
.get(cors.cors, DocController.downloadFinalProtocol)
.post(cors.cors, upload.single('upload'), DocController.uploadFinalProtocol)

module.exports = router;