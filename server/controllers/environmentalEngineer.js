const EnvironmentalEngineers = require('../models/environmentalEngineer');

module.exports = {
    index: async (req, res, next) => {
        const doc = await EnvironmentalEngineers.find({});
        res.status(200).header('Content-type', 'application/json').json(doc);
    },
    newDoc: async (req, res, next) => {
        const newdoc = new EnvironmentalEngineers(req.body);
        const doc = await newdoc.save();
        res.status(201).header('Content-type', 'application/json').json(doc);
    },

    getItem: async (req, res, next) => {
        const { itemId } = req.params;
        const doc = await EnvironmentalEngineers.findById(itemId);
        res.status(200).header('Content-type', 'application/json').json(doc);
    },

    patchItem: async (req, res, next) => {
        const { itemId } = req.params;
        const newDoc = req.body;
        const result = await EnvironmentalEngineers.findByIdAndUpdate(itemId, newDoc, {new: true});
        result.save();
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteItem: async (req, res, next) => {
        const { itemId } = req.params;
        const result = await EnvironmentalEngineers.findByIdAndRemove(itemId);
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteAll: async (req, res, next) => {
        const docs = await EnvironmentalEngineers.remove({});
        res.send('succes')
    }
}