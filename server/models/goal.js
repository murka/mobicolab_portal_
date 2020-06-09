const mongose = require('mongoose');
const Schema = mongose.Schema;

const goalsSchema = new Schema({
    label: String
});

const Goals = mongose.model('goal', goalsSchema);
module.exports = Goals;
