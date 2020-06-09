const mongose = require('mongoose');
const Schema = mongose.Schema;

const passedSamplesSchema = new Schema({
    label: String
});

const PassedSamples = mongose.model('passedSample', passedSamplesSchema);
module.exports = PassedSamples;
