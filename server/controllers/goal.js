const Goals = require('../models/goal');

module.exports = {
    index: async (req, res, next) => {
        const doc = await Goals.find({});
        res.status(200).header('Content-type', 'application/json').json(doc);
    },
    newDoc: async (req, res, next) => {
        const newdoc = new Goals(req.body);
        const doc = await newdoc.save();
        res.status(201).header('Content-type', 'application/json').json(doc);
    },

    getItem: async (req, res, next) => {
        const { itemId } = req.params;
        const doc = await Goals.findById(itemId);
        res.status(200).header('Content-type', 'application/json').json(doc);
    },

    patchItem: async (req, res, next) => {
        const { itemId } = req.params;
        const newDoc = req.body;
        const result = await Goals.findByIdAndUpdate(itemId, newDoc, {new: true});
        result.save();
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteItem: async (req, res, next) => {
        const { itemId } = req.params;
        const result = await Goals.findByIdAndRemove(itemId);
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteAll: async (req, res, next) => {
        const docs = await Goals.remove({});
        res.send('succes')
    }
}