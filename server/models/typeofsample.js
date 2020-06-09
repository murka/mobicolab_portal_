const mongose = require('mongoose');
const Schema = mongose.Schema;

const typeofsampleSchema = new Schema({
    label: String,
    types: Array
});

const TypeOfSamples = mongose.model('typeofsampel', typeofsampleSchema);
module.exports = TypeOfSamples;