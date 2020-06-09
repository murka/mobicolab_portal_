const mongose = require('mongoose');
const Schema = mongose.Schema;
const Acts = require('./acts');
const GCustomers = require('./gcustomers');
const Labs = require('./labs');

const customerSchema = new Schema({
    fullname: String,
    label: String,
    address: {
        zip: String,
        country: String,
        region: String,
        city: String,
        street: String,
        building: String,
        room: String
    },
    tel: String,
    email: String,
    acts: [{
        type: Schema.Types.ObjectId,
        ref: 'act'
    }],
});

customerSchema.post("remove", document => {
    const customerId = document._id;
    Acts.find({ customer: {$in: [customerId]}}).then(items => {
        Promise.all(
            items.map(item => 
                Acts.findByIdAndUpdate(
                    item._id,
                    {$pull: { customer: customerId }},
                    { new: true }
                ))
        );
    });
    Labs.find({ customers: {$in: [customerId]}}).then(items => {
        Promise.all(
            items.map(item => 
                Labs.findByIdAndUpdate(
                    item._id,
                    {$pull: { customers: customerId }},
                    { new: true }
                ))
        );
    });
    GCustomers.find({ customers: {$in: [customerId]}}).then(items => {
        Promise.all(
            items.map(item => 
                GCustomers.findByIdAndUpdate(
                    item._id,
                    {$pull: { customers: customerId }},
                    { new: true }
                ))
        );
    });
});

const Customers = mongose.model('customer', customerSchema);
module.exports = Customers;