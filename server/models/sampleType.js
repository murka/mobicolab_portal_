const mongose = require('mongoose');
const Schema = mongose.Schema;

const sampleTypesSchema = new Schema({
    label: String
});

const SampleTypes = mongose.model('sampleType', sampleTypesSchema);
module.exports = SampleTypes;
