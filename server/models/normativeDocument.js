const mongose = require('mongoose');
const Schema = mongose.Schema;

const normativeDocumentSchema = new Schema({
    label: String
});

const NormativeDocuments = mongose.model('normativeDocument', normativeDocumentSchema);
module.exports = NormativeDocuments;