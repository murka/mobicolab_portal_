const mongose = require('mongoose');
const Schema = mongose.Schema;

const sampleSchema = new Schema({
    label: String
});

const Samples = mongose.model('sample', sampleSchema);
module.exports = Samples;