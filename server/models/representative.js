const mongose = require('mongoose');
const Schema = mongose.Schema;

const representativesSchema = new Schema({
    label: String
});

const Representatives = mongose.model('representative', representativesSchema);
module.exports = Representatives;
