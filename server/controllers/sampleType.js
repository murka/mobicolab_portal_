const SampleTypes = require('../models/sampleType');

module.exports = {
    index: async (req, res, next) => {
        const doc = await SampleTypes.find({});
        res.status(200).header('Content-type', 'application/json').json(doc);
    },
    newDoc: async (req, res, next) => {
        const newdoc = new SampleTypes(req.body);
        const doc = await newdoc.save();
        res.status(201).header('Content-type', 'application/json').json(doc);
    },

    getItem: async (req, res, next) => {
        const { itemId } = req.params;
        const doc = await SampleTypes.findById(itemId);
        res.status(200).header('Content-type', 'application/json').json(doc);
    },

    patchItem: async (req, res, next) => {
        const { itemId } = req.params;
        const newDoc = req.body;
        const result = await SampleTypes.findByIdAndUpdate(itemId, newDoc, {new: true});
        result.save();
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteItem: async (req, res, next) => {
        const { itemId } = req.params;
        const result = await SampleTypes.findByIdAndRemove(itemId);
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteAll: async (req, res, next) => {
        const docs = await SampleTypes.remove({});
        res.send('succes')
    }
}