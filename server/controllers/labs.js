const Lab = require('../models/labs');

module.exports = {
    index: async (req, res, next) => {
        const labs = await Lab.find({});
        res.status(200).header('Content-type', 'application/json').json(labs);
    },
    newLab: async (req, res, next) => {
        const newLab = new Lab(req.body);
        const lab = await newLab.save();
        res.status(201).header('Content-type', 'application/json').json(lab);
    },

    getItem: async (req, res, next) => {
        const { labId } = req.params;
        const doc = await Lab.findById(labId);
        res.status(200).header('Content-type', 'application/json').json(doc);
    },

    patchItem: async (req, res, next) => {
        const { labId } = req.params;
        const newDoc = req.body;
        const result = await Lab.findByIdAndUpdate(labId, newDoc, {new: true});
        result.save();
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteItem: async (req, res, next) => {
        const { labId } = req.params;
        const result = await Lab.findByIdAndRemove(labId);
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteAll: async (req, res, next) => {
        const labs = await Lab.remove({});
        res.send('succes')
    }
}