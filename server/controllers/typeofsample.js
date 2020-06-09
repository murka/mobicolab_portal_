const TypeOfSample = require('../models/typeofsample');

module.exports = {
    index: async (req, res, next) => {
        const types = await TypeOfSample.find({});
        res.status(200).header('Content-type', 'application/json').json(types);
    },
    newType: async (req, res, next) => {
        const newType = new TypeOfSample(req.body);
        const type = await newType.save();
        res.status(201).header('Content-type', 'application/json').json(type);
    },

    postTypes: async (req, res, next) => {
        const { itemId } = req.params;
        const newType = req.body;
        console.log(req.body.value);
        
        const doc = await TypeOfSample.findById(itemId);
        doc.types.push(req.body.value);
        console.log(doc);
        doc.save();
        res.status(201).header('Content-type', 'application/json').json(doc);
    },

    getItem: async (req, res, next) => {
        const { itemId } = req.params;
        const doc = await TypeOfSample.findById(itemId);
        res.status(200).header('Content-type', 'application/json').json(doc);
    },

    patchItem: async (req, res, next) => {
        const { itemId } = req.params;
        const newDoc = req.body;
        const result = await TypeOfSample.findByIdAndUpdate(itemId, newDoc, {new: true});
        result.save();
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteItem: async (req, res, next) => {
        const { itemId } = req.params;
        const result = await TypeOfSample.findByIdAndRemove(itemId);
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteAll: async (req, res, next) => {
        const docs = await TypeOfSample.remove({});
        res.send('succes')
    }
}