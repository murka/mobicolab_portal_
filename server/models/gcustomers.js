const mongose = require('mongoose');
const Schema = mongose.Schema;
const Acts = require('./acts');
const Customers = require('./gcustomers');
const Labs = require('./labs');

const gcustomerSchema = new Schema({
    fullname: String,
    label: String,
    tel: String,
    email: String,
    acts: [{
        type: Schema.Types.ObjectId,
        ref: 'act'
    }],
    customers: [{
        type: Schema.Types.ObjectId,
        ref: 'customer'
    }],
    labs: [{
        type: Schema.Types.ObjectId,
        ref: 'lab'
    }],
});

gcustomerSchema.post("remove", document => {
    const gcustomerId = document._id;
    Acts.find({ generalCustomer: {$in: [gcustomerId]}}).then(items => {
        Promise.all(
            items.map(item => 
                Acts.findByIdAndUpdate(
                    item._id,
                    {$pull: { generalCustomer: gcustomerId }},
                    { new: true }
                ))
        );
    });
    Labs.find({ generalCustomers: {$in: [gcustomerId]}}).then(items => {
        Promise.all(
            items.map(item => 
                Labs.findByIdAndUpdate(
                    item._id,
                    {$pull: { labs: gcustomerId }},
                    { new: true }
                ))
        );
    });
    Customers.find({ generalCustomers: {$in: [gcustomerId]}}).then(items => {
        Promise.all(
            items.map(item => 
                GCustomers.findByIdAndUpdate(
                    item._id,
                    {$pull: { labs: gcustomerId }},
                    { new: true }
                ))
        );
    });
});

const GCustomers = mongose.model('gcustomer', gcustomerSchema);
module.exports = GCustomers;