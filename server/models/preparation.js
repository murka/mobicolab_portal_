const mongose = require('mongoose');
const Schema = mongose.Schema;

const preparationSchema = new Schema({
    label: String
});

const Preparations = mongose.model('preparation', preparationSchema);
module.exports = Preparations;