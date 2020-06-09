const GCustomer = require('../models/gcustomers');

module.exports = {
    index: async (req, res, next) => {
        const customers = await GCustomer.find({});
        res.status(200).header('Content-type', 'application/json').json(customers);
    },
    newGCustomer: async (req, res, next) => {
        const newGCustomer = new GCustomer(req.body);
        const customer = await newGCustomer.save();
        res.status(201).header('Content-type', 'application/json').json(customer);
    },

    getItem: async (req, res, next) => {
        const { gcustomerId } = req.params;
        const doc = await GCustomer.findById(gcustomerId);
        res.status(200).header('Content-type', 'application/json').json(doc);
    },

    patchItem: async (req, res, next) => {
        const { gcustomerId } = req.params;
        const newDoc = req.body;
        const result = await GCustomer.findByIdAndUpdate(gcustomerId, newDoc, {new: true});
        result.save();
        res.status(200).header('Content-Type', 'application/json').json(result);
    },

    deleteAll: async (req, res, next) => {
        const gcusromers = await GCustomer.remove({});
        res.send('succes')
    }
}
