const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const authenticate = require("./authenticate");
const config = require("./config");

const Acts = require("./models/acts");

const usersRouter = require("./routes/users");
const actRouter = require("./routes/acts");
const fileRouter = require("./routes/file");
const customerRouter = require("./routes/customers");
const gcustomerRouter = require("./routes/gcustomers");
const labRouter = require("./routes/labs");
const typeofsampleRouter = require("./routes/typeofsample");
const normativeDocumentRouter = require("./routes/normativeDocument");
const sampleRouter = require("./routes/sample");
const preparationRouter = require("./routes/preparation");
const definedIndicatorsRouter = require("./routes/definedIndicators");
const placeRouter = require("./routes/place");
const toolTypeRouter = require("./routes/toolType");
const methodRouter = require("./routes/method");
const sampleTypeRouter = require("./routes/sampleType");
const goalRouter = require("./routes/goal");
const environmentalEngineerRouter = require("./routes/environmentalEngineer");
const representativeRouter = require("./routes/representative");
const passedSampleRouter = require("./routes/passedSample");

const url = config.mongoUrl;
const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then(
  db => {
    console.log("Connected correctly to server");
  },
  err => {
    console.log(err);
  }
);

const app = express();

//app.all('*', (req, res, next) => {
//  if (req.secure) {
//    return next();
//  } else {
//    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
//  }
//});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// Routes
app.use("/api/users", usersRouter);
app.use("/api/acts", actRouter);
app.use("/api/file", fileRouter);
app.use("/api/customer", customerRouter);
app.use("/api/generalCustomer", gcustomerRouter);
app.use("/api/lab", labRouter);
app.use("/api/typeOfSample", typeofsampleRouter);
app.use("/api/normativeDocument", normativeDocumentRouter);
app.use("/api/sample", sampleRouter);
app.use("/api/preparation", preparationRouter);
app.use("/api/definedIndicators", definedIndicatorsRouter);
app.use("/api/toolType", toolTypeRouter);
app.use("/api/method", methodRouter);
app.use("/api/sampleType", sampleTypeRouter);
app.use("/api/goal", goalRouter);
app.use("/api/place", placeRouter);
app.use("/api/environmentalEngineer", environmentalEngineerRouter);
app.use("/api/representative", representativeRouter);
app.use("/api/passedSample", passedSampleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// async function renameTimeFields() {
//   const docs = await Acts.find({});
//   docs.forEach(doc => {
//     const typess = doc.typeOfWater;
//     doc.updateOne({ $set: { "datetime.time": '0:00',  "typeOfSample.habitan": '', "typeOfSample.types": typess} }, (err, result) => {
//       if (!err) {
//         console.log(result);
//         console.log(doc);
//         doc.updateOne({ $unset: { "typeOfWater": ""}}, (err, res)=> {
//           if (!err) {console.log(res);
//           }
//         })
//       }
//     });
//   });
// }

// renameTimeFields();

module.exports = app;
