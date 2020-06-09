import * as mongoose from 'mongoose';

export const customerSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'act'
    }],
});