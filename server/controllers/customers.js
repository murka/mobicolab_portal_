const Customer = require('../models/customers');

module.exports = {
    index: async (req, res, next) => {
        const customers = await Customer.find({}).populate('generalCustomers');
        res.status(200).header('Content-type', 'application/json').json(customers);
    },
    newCustomer: async (req, res, next) => {
        const newCustomer = new Customer(req.body);
        const customer = await newCustomer.save();
        res.status(201).header('Content-type', 'application/json').json(customer);
    },
    getCustomer: async (req, res, next) => {
        const { customerId } = req.params;
        const customer = await Customer.findById(customerId).populate('generalCustomer');
        res.status(200).header('Content-type', 'application/json').json(customer);
    },
    patchCustomer: async (req, res, next) => {
        const { customerId } = req.params;
        const newDoc = req.body;
        const result = await Customer.findByIdAndUpdate(customerId, newDoc, {new: true});
        result.save();
        res.status(200).header('Content-Type', 'application/json').json(result);
    },
    deleteAll: async (req, res, next) => {
        const cusromers = await Customer.remove({});
        res.send('succes')
    }
}