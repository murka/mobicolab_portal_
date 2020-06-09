const mongose = require('mongoose');
const Schema = mongose.Schema;

const toolTypesSchema = new Schema({
    label: String
});

const ToolTypes = mongose.model('toolType', toolTypesSchema);
module.exports = ToolTypes;