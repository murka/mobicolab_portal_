const DefinedIndicator = require('../models/definedIndicators');

module.exports = {
    index: async (req, res, next) => {
        const doc = await DefinedIndicator.find({});
        res.status(200).header('Content-type', 'application/json').json(doc);
    },
    newDoc: async (req, res, next) => {
        const newdoc = new DefinedIndicator(req.body);
        const doc = await newdoc.save();
        res.status(201).header('Content-type', 'application/json').json(doc);
    },

    newDocs: async (req, res, next) => {
        const newDocsArray = req.body;
        const docs = await newDocsArray.forEach(element => {
            const newdoc = new DefinedIndicator(element);
            newdoc.save();
            res.status(201).header('Content-type', 'application/json').json(newdoc);
        });
        console.log(docs);
    },

    getItem: async (req, res, next) => {
        const { itemId } = req.params;
        const doc = await DefinedIndicator.findById(itemId);
        res.status(200).header('Content-type', 'application/json').json(doc);
    },

    patchItem: async (req, res, next) => {
        const { itemId } = req.params;
        const newDoc = req.body;
        const result = await DefinedIndicator.findByIdAndUpdate(itemId, newDoc, {new: true});
        result.save();
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteItem: async (req, res, next) => {
        const { itemId } = req.params;
        const result = await DefinedIndicator.findByIdAndRemove(itemId);
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteAll: async (req, res, next) => {
        const docs = await DefinedIndicator.remove({});
        res.send('succes')
    }
}