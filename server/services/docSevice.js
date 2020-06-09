const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const { Readable } = require('stream');
const Grid = require('gridfs-stream');
const {mongo, connection} = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
Grid.mongo = mongo;
const streamifier = require('streamifier');
const config = require('../config');
const multer = require('multer');
const YandexDisk = require('yandex-disk').YandexDisk;
let disk = new YandexDisk('AgAAAAACrxXlAAYjW3RukAw4-kLSgRjGeVoNMr0')

let gfs;

connection.once('open', () => {
    // Init stream
    gfs = Grid(connection.db);
    gfs.collection('docs');
  });
  const storage = new GridFsStorage({
    url: config.mongoUrl,
    file: (req, file) => {
        const filename = `act${id}.docx`;
        const fileInfo = {
            filename: filename,
            bucketName: 'docs'
        };
        resolve(fileInfo);
    }
});
const upload = multer({ storage });

const  docService = (id, req) => {

    var content = fs.readFileSync(path.resolve('./public/shared/acts/', 'input.docx'), 'binary');
    var zip = new PizZip(content);
    var doc = new Docxtemplater();
    doc.loadZip(zip);  

    this.setData = doc.setData({
        name: req.name,
        customer: req.customer,
        general_customer: req.generalCustomer,
        type_of_water: req.typeOfWater,
        object_name: req.objectName,
        place: req.place,
        data: req.data,
        method: req.method,
        toolType: req.toolType,
        climatic_environmental: req.climaticEnvironmental,
        planning: req.planning,
        normative_document: req.normativeDocument,
        sample_type: req.sampleType,
        sample: req.sample,
        preparation: req.preparation,
        goal: req.goal,
        defined_indicators: req.definedIndicators,
        additions: req.additions,
        information_about_selection: req.informationAboutSelection,
        environmental_engineer: req.environmentalEngineer,
        representative: req.representative,
        passed_sample: req.passedSample
    });
    try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        console.log(JSON.stringify(req.body));
        doc.render()
        console.log('render work');
    }
    catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object).
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors.map(function (error) {
                return error.properties.explanation;
            }).join("\n");
            console.log('errorMessages', errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
    }
    //const writestream = gfs.createWriteStream(upload.any());
    const buf = doc.getZip()
                 .generate({type: 'base64'});
    
    //streamifier.createReadStream(buf).pipe(writestream);
    

    //const readable = new Readable()
    ///readable._read = () => {} // _read is required but you can noop it
    //readable.push(buf);
    //readable.push(null);
    //readable.pipe(writestream());
    //buf.pipe(writestream);



    
    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(path.resolve('./public/docs/acts', `act${id}.docx`), buf);
    disk.writeFile(`Portal/Акты/Акты/act${id}.docx`, buf, 'base64', (err, result) => {
        console.log("err", err);
        console.log('result', result);
    })

};

module.exports.docService = docService;

