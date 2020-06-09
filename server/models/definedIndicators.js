const mongose = require('mongoose');
const Schema = mongose.Schema;

const definedIndicatorsSchema = new Schema({
    label: String
});

const DefinedIndicator = mongose.model('definedIndicator', definedIndicatorsSchema);
module.exports = DefinedIndicator;
