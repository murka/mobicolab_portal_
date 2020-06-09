const mongose = require('mongoose');
const Schema = mongose.Schema;
const Acts = require('./acts');
const GCustomers = require('./gcustomers');
const Customers = require('./gcustomers');

const labSchema = new Schema({
    fullname: String,
    label: String,
    adress: String,
    tel: String,
    email: String,
    acts: [{
        type: Schema.Types.ObjectId,
        ref: 'act'
    }],
    generalCustomers: [{
        type: Schema.Types.ObjectId,
        ref: 'gcustomer'
    }],
    customers: [{
        type: Schema.Types.ObjectId,
        ref: 'customer'
    }]
});

labSchema.post("remove", document => {
    const labId = document._id;
    Acts.find({ lab: {$in: [labId]}}).then(items => {
        Promise.all(
            items.map(item => 
                Acts.findByIdAndUpdate(
                    item._id,
                    {$pull: { lab: labId }},
                    { new: true }
                ))
        );
    });
    Customers.find({ labs: {$in: [labId]}}).then(items => {
        Promise.all(
            items.map(item => 
                Labs.findByIdAndUpdate(
                    item._id,
                    {$pull: { labs: labId }},
                    { new: true }
                ))
        );
    });
    GCustomers.find({ labs: {$in: [labId]}}).then(items => {
        Promise.all(
            items.map(item => 
                GCustomers.findByIdAndUpdate(
                    item._id,
                    {$pull: { labs: labId }},
                    { new: true }
                ))
        );
    });
});

const Labs = mongose.model('lab', labSchema);
module.exports = Labs;