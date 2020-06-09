const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Customers = require("./customers");
const GCustomers = require("./gcustomers");
const Labs = require("./labs");
const mongooseCleanup = require("mongoose-cleanup");

const actsSchema = new Schema(
  {
    name: {
      type: String
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer"
    },
    generalCustomer: {
      type: Schema.Types.ObjectId,
      ref: "gcustomer"
    },
    lab: {
      type: Schema.Types.ObjectId,
      ref: "lab"
    },
    typeOfSample: {
      habitan: {
        type: String
      },
      types: {
        type: String
      }
    },
    objectName: {
      type: String,
      required: false
    },
    place: {
      type: String,
      required: false
    },
    datetime: {
      date: {
        type: Date,
        require: false
      },
      time: {
        type: String,
        require: false
      }
    },
    method: {
      type: String,
      require: false
    },
    toolType: {
      type: String,
      required: false
    },
    climaticEnvironmental: {
      type: String
    },
    planning: {
      type: String
    },
    normativeDocument: {
      type: Array,
      required: false
    },
    sampleType: {
      type: String,
      required: false
    },
    sample: {
      type: Array,
      required: false
    },
    preparation: {
      type: Array
    },
    goal: {
      type: String,
      required: false
    },
    definedIndicators: {
      type: Array,
      required: false
    },
    additions: {
      type: String
    },
    informationAboutSelection: {
      type: String
    },
    environmentalEngineer: {
      type: String,
      required: false
    },
    representative: {
      type: String
    },
    passedSample: {
      type: String,
      required: false
    },
    status: {
      production: {
        type: Boolean,
        default: true
      },
      uploaded: {
        type: Boolean,
        default: false
      },
      registration: {
        type: Boolean,
        default: false
      },
      analys: {
        type: Boolean,
        default: false
      },
      addAnalys: {
        type: Boolean,
        default: false
      },
      protocolCreated: {
        type: Boolean,
        default: false
      },
      remarks: {
        type: Boolean,
        default: false
      },
      noRemarks: {
        type: Boolean,
        default: false
      },
      protocolBy: {
        type: Boolean,
        default: false
      },
      protocolUploaded: {
        type: Boolean,
        default: false
      },
      comments: Array
    },
    files: [{
      title: String,
      name: String,
      path: String,
    }],
    application: [{
      place: {
        type: String,
        require: false,
        default: ""
      },
      datetime: {
        date: {
          type: Date,
          require: false,
          default: ""
        },
        time: {
          type: String,
          require: false,
          default: ""
        }
      }
    }]
  },
  {
    timestamps: true
  }
);

actsSchema.post("remove", document => {
  console.log("test", document._id);

  const actId = document._id;
  Customers.find({ acts: { $in: [actId] } }).then(items => {
    console.log("items", actId);

    Promise.all(
      items.map(item => {
        console.log("item", item);
        Customers.findByIdAndUpdate(
          item._id,
          { $pull: { acts: actId } },
          { new: true },
          err => {
            if (err) throw err;
          }
        );
      })
    );
  });
  Labs.find({ acts: { $in: [actId] } }).then(items => {
    Promise.all(
      items.map(item =>
        Labs.findByIdAndUpdate(
          item._id,
          { $pull: { acts: actId } },
          { new: true },
          err => {
            if (err) throw err;
          }
        )
      )
    );
  });
  GCustomers.find({ acts: { $in: [actId] } }).then(items => {
    Promise.all(
      items.map(item =>
        GCustomers.findByIdAndUpdate(
          item._id,
          { $pull: { acts: actId } },
          { new: true },
          err => {
            if (err) throw err;
          }
        )
      )
    );
  });
});

actsSchema.post("save", document => {
  const actId = document._id;
  const customerId = document.customer._id;
  const gcustomerId = document.generalCustomer._id;
  const labId = document.lab._id;
  Customers.updateOne(
    { acts: { $in: [actId] } },
    { $pull: { acts: actId } },
    err => {
      if (err) throw err;
    }
  );
  Customers.updateOne({ _id: customerId }, { $push: { acts: actId } }, (err, result) => {
    if (err) throw err;
  });
  GCustomers.updateOne(
    { acts: { $in: [actId] } },
    { $pull: { acts: actId } },
    (err, result) => {
      if (err) throw err;
    }
  );
  GCustomers.updateOne({ _id: gcustomerId }, { $push: { acts: actId } }, err => {
    if (err) throw err;
  });
  Labs.updateOne(
    { acts: { $in: [actId] } },
    { $pull: { acts: actId } },
    err => {
      if (err) throw err;
    }
  );
  Labs.updateOne({ _id: labId }, { $push: { acts: actId } }, err => {
    if (err) throw err;
  });
});

const Acts = mongoose.model("act", actsSchema);
module.exports = Acts;
