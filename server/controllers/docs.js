const Act = require('../models/acts');
const createDoc = require('../services/docSevice');
const path = require('path');
const YandexDisk = require('yandex-disk').YandexDisk;
const disk = new YandexDisk('AgAAAAACrxXlAAYjW3RukAw4-kLSgRjGeVoNMr0');
const fs = require('fs');


module.exports = {
    allDocs: async (req, res, next) => {
        gfs.files.find().toArray((err, files) => {
            // Check if files
            if (!files || files.length === 0) {
                res.json({msg: "No files!"});
            } else { 
                res.json({ files: files });
            }
        });
    },
    newDoc: async (req, res, next) => {
        const { actId } = req.params;
        const body = await Act.findById(actId);
        console.log(body);
        createDoc.docService(actId, body);
        const result = await Act.findByIdAndUpdate(actId, {$set:{doc: true}});
        res.status(200).header('Content-Type', 'application/json').json(result);
    },
    uploadDoc: async (req, res, next) => {
        const { actId } = req.params;
        const file = req.file.buffer;
        if (!file) {
            console.log("No file is available!");
            return res.send({
                success: false
        });
        } else {
            console.log('File is available!');
            const doc = await Act.findById(actId).populate('customer').populate('generalCustomer').populate('lab');
            const date = new Date(doc.date);
            const nameDate = new Intl.DateTimeFormat('ru-RU').format(date);
            const name = `${doc.name}_${nameDate}_${actId}.docx`;
            const year = date.getFullYear();
            const customer = doc.customer.label;
            const gcustomer = doc.generalCustomer.label;
            const lab = doc.lab.label;
            const month = new Intl.DateTimeFormat('ru-RU', {month: 'long'}).format(date);
            const filepath = `/Portal/${year}/${customer}/${gcustomer}/${month}/${lab}/`;
            disk.exists(filepath, (err, next) => { 
                if (err) throw err;
                if (next) {
                    disk.cd(filepath);
                    disk.writeFile(name, file, 'utf8', (err) => {
                        if (err) throw err;
                        disk.cd('../../../../../../');
                        return
                    });
                }
                if (!next) {
                    disk.cd('Portal');
                    disk.exists(`${year}`, (err, next) => {
                        if (err) throw err;
                        if (next === false) { disk.mkdir(`${year}`, (err) => {
                            if (err) throw err;
                            return
                        })}
                        disk.cd(`${year}`);
                        disk.exists(`${customer}`, (err, next) => {
                            if (err) throw err;
                            if (next === false) { disk.mkdir(`${customer}`, (err) => {
                                if (err) throw err;
                                return
                            }) };
                            disk.cd(`${customer}`);
                            disk.exists(`${gcustomer}`, (err, next) => {
                                if (err) throw err;
                                if (next === false) { disk.mkdir(`${gcustomer}`, (err) => {
                                    if (err) throw err;
                                    return
                                })}
                                disk.cd(`${gcustomer}`);
                                disk.exists(`${month}`, (err, next) => {
                                    if (err) throw err;
                                    if (next === false) { disk.mkdir(`${month}`, (err) => {
                                        if (err) throw err;
                                        return
                                    }) };
                                    disk.cd(`${month}`);
                                    disk.exists(`${lab}`, (err, next) => {
                                        if (err) throw err;
                                        if (!next) { disk.mkdir(`${lab}`, (err) => {
                                            if (err) throw err;
                                            return
                                        })};
                                        disk.cd(`${lab}`);
                                        disk.writeFile(name, file, 'utf8', (err) => {
                                            if (err) throw err;
                                            disk.cd('../../../../../../');
                                    });
                                    })
                                });
                            });
                        });
                    });
                }
            })
            doc.docs.act.name = name;
            doc.docs.act.path = filepath;
            doc.status.uploaded = true;
            doc.status.production = false;
            doc.save();
            return res.status(200).header('Content-Type', 'application/json').json(doc);
        };
    },
    downloadDoc: async (req, res, next) => {
        const { actId } = req.params;
        const doc = await Act.findById(actId);
        const name = doc.docs.act.name;
        const urlPath = doc.docs.act.path
        const filepath = path.join(__dirname, `../public/uploads/${name}`);
        disk.downloadFile(urlPath + name, filepath, (err) => {
            if (err) throw err;
            res.download(filepath, (err) => {
                if (err) throw err;
                fs.unlink(filepath, (err) => {
                    if (err) throw err;
                });
            });
        });;
    },
    uploadScanAct: async (req, res, next) => {
        const { actId } = req.params;
        const file = req.file.buffer;
        if (!file) {
            console.log("No file is available!");
            return res.send({
                success: false
        });
        } else {
            console.log('File is available!');
            const doc = await Act.findById(actId).populate('customer').populate('generalCustomer').populate('lab');
            const date = new Date(doc.date);
            const nameDate = new Intl.DateTimeFormat('ru-RU').format(date);
            const name = `${doc.name}_${nameDate}_${actId}.pdf`;
            const year = date.getFullYear();
            const customer = doc.customer.label;
            const gcustomer = doc.generalCustomer.label;
            const lab = doc.lab.label;
            const month = await new Intl.DateTimeFormat('ru-RU', {month: 'long'}).format(date);
            const filepath = `Portal/${year}/${customer}/${gcustomer}/${month}/${lab}/`;
            disk.exists(filepath, (err, next) => {
                if (err) throw err;
                if (next) {
                    disk.cd(filepath);
                    disk.writeFile(name, file, 'utf8', (err) => {
                        if (err) throw err;
                        disk.cd('../../../../../../');
                        return
                    });
                }
                if (!next) {
                    disk.cd('Portal');
                    disk.exists(`${year}`, (err, next) => {
                        if (err) throw err;
                        if (next === false) { disk.mkdir(`${year}`, (err) => {
                            if (err) throw err;
                            return
                        })}
                        disk.cd(`${year}`);
                        disk.exists(`${customer}`, (err, next) => {
                            if (err) throw err;
                            if (next === false) { disk.mkdir(`${customer}`, (err) => {
                                if (err) throw err;
                                return
                            }) };
                            disk.cd(`${customer}`);
                            disk.exists(`${gcustomer}`, (err, next) => {
                                if (err) throw err;
                                if (next === false) { disk.mkdir(`${gcustomer}`, (err) => {
                                    if (err) throw err;
                                    return
                                })}
                                disk.cd(`${gcustomer}`);
                                disk.exists(`${month}`, (err, next) => {
                                    if (err) throw err;
                                    if (next === false) { disk.mkdir(`${month}`, (err) => {
                                        if (err) throw err;
                                        return
                                    }) };
                                    disk.cd(`${month}`);
                                    disk.exists(`${lab}`, (err, next) => {
                                        if (err) throw err;
                                        if (!next) { disk.mkdir(`${lab}`, (err) => {
                                            if (err) throw err;
                                            return
                                        })};
                                        disk.cd(`${lab}`);
                                        disk.writeFile(name, file, 'utf8', (err) => {
                                            if (err) throw err;
                                            disk.cd('../../../../../../');
                                    });
                                    })
                                });
                            });
                        });
                    });
                }
            })
            doc.docs.scan.name = name;
            doc.docs.scan.path = filepath;
            doc.status.registration = true;
            doc.status.uploaded = false;
            doc.save();
            return res.status(200).header('Content-Type', 'application/json').json(doc);
        };
    },
    downloadScan: async (req, res, next) => {
        const { actId } = req.params;
        const doc = await Act.findById(actId);
        const name = doc.docs.scan.name;
        const urlPath = doc.docs.scan.path;
        const filepath = path.join(__dirname, `../public/uploads/${name}`);
        disk.downloadFile(urlPath + name, filepath, (err) => {
            if (err) throw err;
            res.download(filepath, (err) => {
                if (err) throw err;
                fs.unlink(filepath, (err) => {
                    if (err) throw err;
                });
            });
        });
    },
    uploadProtocol: async (req, res, next) => {
        const { actId } = req.params;
        const file = req.file.buffer;
        if (!file) {
            res.send({
                success: false,
                msg: 'no file is available!'
            }) 
        } else {
            console.log('File is available!');
            const doc = await Act.findById(actId).populate('customer').populate('generalCustomer').populate('lab');
            const date = new Date(doc.date);
            const nameDate = new Intl.DateTimeFormat('ru-RU').format(date);
            const name = `${doc.name}_протокол_${nameDate}_${actId}.pdf`;
            const year = date.getFullYear();
            const customer = doc.customer.label;
            const gcustomer = doc.generalCustomer.label;
            const lab = doc.lab.label;
            const month = new Intl.DateTimeFormat('ru-RU', {month: 'long'}).format(date);
            const filepath = `Portal/${year}/${customer}/${gcustomer}/${month}/${lab}/`;
            disk.exists(filepath, (err, next) => {
                if (err) throw err;
                if (next) {
                    disk.cd(filepath);
                    disk.writeFile(name, file, 'utf8', (err) => {
                        if (err) throw err;
                        disk.cd('../../../../../../');
                        return
                    });
                }
                if (!next) {
                    disk.cd('Portal');
                    disk.exists(`${year}`, (err, next) => {
                        if (err) throw err;
                        if (next === false) { disk.mkdir(`${year}`, (err) => {
                            if (err) throw err;
                            return
                        })}
                        disk.cd(`${year}`);
                        disk.exists(`${customer}`, (err, next) => {
                            if (err) throw err;
                            if (next === false) { disk.mkdir(`${customer}`, (err) => {
                                if (err) throw err;
                                return
                            }) };
                            disk.cd(`${customer}`);
                            disk.exists(`${gcustomer}`, (err, next) => {
                                if (err) throw err;
                                if (next === false) { disk.mkdir(`${gcustomer}`, (err) => {
                                    if (err) throw err;
                                    return
                                })}
                                disk.cd(`${gcustomer}`);
                                disk.exists(`${month}`, (err, next) => {
                                    if (err) throw err;
                                    if (next === false) { disk.mkdir(`${month}`, (err) => {
                                        if (err) throw err;
                                        return
                                    }) };
                                    disk.cd(`${month}`);
                                    disk.exists(`${lab}`, (err, next) => {
                                        if (err) throw err;
                                        if (!next) { disk.mkdir(`${lab}`, (err) => {
                                            if (err) throw err;
                                            return
                                        })};
                                        disk.cd(`${lab}`);
                                        disk.writeFile(name, file, 'utf8', (err) => {
                                            if (err) throw err;
                                            disk.cd('../../../../../../');
                                    });
                                    })
                                });
                            });
                        });
                    });
                }
            })
            doc.docs.protocol.name = name;
            doc.docs.protocol.path = filepath;
            doc.status.protocolCreated = true;
            doc.status.registration = false;
            doc.save();
            return res.status(200).header('Content-Type', 'application/json').json(doc);
        };
    },
    downloadProtocol: async (req, res, next) => {
        const { actId } = req.params;
        const doc = await Act.findById(actId);
        const name = doc.docs.protocol.name;
        const urlPath = doc.docs.protocol.path;
        const filepath = path.join(__dirname, `../public/uploads/${name}`); 
        disk.downloadFile(urlPath + name, filepath, (err) => {
            if (err) throw err;
            res.download(filepath, (err) => {
                if (err) throw err;
                fs.unlink(filepath, (err) => {
                    if (err) throw err; 
                })
            })
        })
    },
    uploadFinalProtocol: async (req, res, next) => {
        const { actId } = req.params;
        const file = req.file.buffer;
        if (!file) {
            res.send({
                success: false,
                msg: 'no file is available!'
            })
        } else {
            console.log('File is available!');
            const doc = await Act.findById(actId).populate('customer').populate('generalCustomer').populate('lab');
            const date = new Date(doc.date);
            const nameDate = new Intl.DateTimeFormat('ru-RU').format(date);
            const name = `${doc.name}_протокол(итог)_${nameDate}_${actId}.pdf`;
            const year = date.getFullYear();
            const customer = doc.customer.label;
            const gcustomer = doc.generalCustomer.label;
            const lab = doc.lab.label;
            const month = new Intl.DateTimeFormat('ru-RU', {month: 'long'}).format(date);
            const filepath = `Portal/${year}/${customer}/${gcustomer}/${month}/${lab}/`;
            disk.exists(filepath, (err, next) => {
                if (err) throw err;
                if (next) {
                    disk.cd(filepath);
                    disk.writeFile(name, file, 'utf8', (err) => {
                        if (err) throw err;
                        disk.cd('../../../../../../');
                        return 
                    });
                }
                if (!next) {
                    disk.cd('Portal');
                    disk.exists(`${year}`, (err, next) => {
                        if (err) throw err;
                        if (next === false) { disk.mkdir(`${year}`, (err) => {
                            if (err) throw err;
                        })}
                        disk.cd(`${year}`);
                        disk.exists(`${customer}`, (err, next) => {
                            if (err) throw err;
                            if (next === false) { disk.mkdir(`${customer}`, (err) => {
                                if (err) throw err;
                                return
                            }) };
                            disk.cd(`${customer}`);
                            disk.exists(`${gcustomer}`, (err, next) => {
                                if (err) throw err;
                                if (next === false) { disk.mkdir(`${gcustomer}`, (err) => {
                                    if (err) throw err;
                                    return
                                })}
                                disk.cd(`${gcustomer}`);
                                disk.exists(`${month}`, (err, next) => {
                                    if (err) throw err;
                                    if (next === false) { disk.mkdir(`${month}`, (err) => {
                                        if (err) throw err;
                                        return
                                    }) };
                                    disk.cd(`${month}`);
                                    disk.exists(`${lab}`, (err, next) => {
                                        if (err) throw err;
                                        if (!next) { disk.mkdir(`${lab}`, (err) => {
                                            if (err) throw err;
                                            return
                                        })};
                                    disk.cd(`${lab}`);
                                    disk.writeFile(name, file, 'utf8', (err) => {
                                        if (err) throw err;
                                        disk.cd('../../../../../../');
                                    });
                                    })
                                });
                            });
                        });
                    });
                }
            }) 
            doc.docs.protocolFinal.name = name;
            doc.docs.protocolFinal.path = filepath;
            doc.status.protocolUploaded = true;
            doc.status.protocolCreated = false;
            doc.save();
            return res.status(200).header('Content-Type', 'application/json').json(doc);
        };
    },
    downloadFinalProtocol: async (req, res, next) => {
        const { actId } = req.params;
        const doc = await Act.findById(actId);
        const name = doc.docs.protocolFinal.name;
        const urlPath = doc.docs.protocolFinal.path;
        const filepath = path.join(__dirname, `../public/uploads/${name}`);
        disk.downloadFile(urlPath + name, filepath, (err) => {
            if (err) throw err;
            res.download(filepath, (err) => {
                if (err) throw err;
                fs.unlink(filepath, (err) => {
                    if (err) throw err; 
                })
            })
        })
    }
}