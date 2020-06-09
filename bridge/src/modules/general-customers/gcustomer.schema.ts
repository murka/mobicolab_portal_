import * as mongoose from 'mongoose';

export const gcustomerSchema = new mongoose.Schema({
    fullname: String,
    label: String,
    tel: String,
    email: String,
    acts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'act'
    }],
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    }],
    labs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lab'
    }],
});