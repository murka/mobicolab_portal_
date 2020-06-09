import * as mongoose from 'mongoose';

export const labSchema = new mongoose.Schema({
    fullname: String,
    label: String,
    adress: String,
    tel: String,
    email: String,
    acts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'act'
    }],
    generalCustomers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gcustomer'
    }],
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    }]
});