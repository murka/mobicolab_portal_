const Act = require('../models/acts');
const Customer = require('../models/customers');
const GCustomer = require('../models/gcustomers');
const Lab = require('../models/labs');

module.exports = {
    index: async (req, res, next) => {
        const acts = await Act.find({}).populate('lab');
        res.status(200).header('Content-type', 'application/json').json(acts);
    },
    deleteAll: async (req, res, next) => {
        const acts = await Act.remove({});
        res.send('succes')
    },
    newAct: async (req, res, next) => {
        const newAct = new Act(req.body);
        const act = await newAct.save();
        res.status(201).header('Content-type', 'application/json').json(act);
    },
    getAct: async (req, res, next) => {
        const { actId } = req.params;
        const act = await Act.findById(actId);
        res.status(200).header('Content-Type', 'application/json').json(act);
    },
    replaceAct: async (req, res, next) => {
        const { actId } = req.params;
        const newAct = req.body;
        const result = await Act.findByIdAndUpdate(actId, newAct);
        res.status(200).header('Content-Type', 'application/json').json(result);
    },
    updateAct: async (req, res, next) => {
        const { actId } = req.params;
        const newAct = req.body;
        const result = await Act.findByIdAndUpdate(actId, newAct, {new: true});
        result.save();
        res.status(200).header('Content-Type', 'application/json').json(result);
    },
    deleteAct: async (req, res, next) => {
        const { actId } = req.params;
        const doc = await Act.findById(actId);
        const result = doc.remove();
        res.status(200).header('Content-Type', 'application/json').json(result);
    },
    postComment: async (req, res, next) => {
        const comment = req.body.comment;
        const { actId } = req.params;
        const doc = await Act.findById(actId);
        doc.status.comments.push(comment);
        doc.save();
        res.status(201).header('Content-type', 'application/json').json(doc);
    }

}
