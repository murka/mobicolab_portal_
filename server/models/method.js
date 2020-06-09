const mongose = require('mongoose');
const Schema = mongose.Schema;

const methodsSchema = new Schema({
    label: String
});

const Methods = mongose.model('mothod', methodsSchema);
module.exports = Methods;
