const mongose = require('mongoose');
const Schema = mongose.Schema;

const placesSchema = new Schema({
    label: String
});

const Places = mongose.model('place', placesSchema);
module.exports = Places;