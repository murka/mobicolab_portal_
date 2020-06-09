const mongose = require('mongoose');
const Schema = mongose.Schema;

const environmentalEngineersSchema = new Schema({
    label: String
});

const EnvironmentalEngineers = mongose.model('environmentalEngineer', environmentalEngineersSchema);
module.exports = EnvironmentalEngineers;
