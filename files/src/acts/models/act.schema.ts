import * as mongoose from 'mongoose';

export const actSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
    },
    generalCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'gcustomer',
    },
    lab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lab',
    },
    typeOfSample: {
      habitan: {
        type: String,
      },
      types: {
        type: String,
      },
    },
    objectName: {
      type: String,
      required: false,
    },
    place: {
      type: String,
      required: false,
    },
    datetime: {
      date: {
        type: Date,
        require: false,
      },
      time: {
        type: String,
        require: false,
      },
    },
    method: {
      type: String,
      require: false,
    },
    toolType: {
      type: String,
      required: false,
    },
    climaticEnvironmental: {
      type: String,
    },
    planning: {
      type: String,
    },
    normativeDocument: {
      type: Array,
      required: false,
    },
    sampleType: {
      type: String,
      required: false,
    },
    sample: {
      type: Array,
      required: false,
    },
    preparation: {
      type: Array,
    },
    goal: {
      type: String,
      required: false,
    },
    definedIndicators: {
      type: Array,
      required: false,
    },
    additions: {
      type: String,
    },
    informationAboutSelection: {
      type: String,
    },
    environmentalEngineer: {
      type: String,
      required: false,
    },
    representative: {
      type: String,
    },
    passedSample: {
      type: String,
      required: false,
    },
    status: {
      production: {
        type: Boolean,
        default: true,
      },
      uploaded: {
        type: Boolean,
        default: false,
      },
      registration: {
        type: Boolean,
        default: false,
      },
      analys: {
        type: Boolean,
        default: false,
      },
      addAnalys: {
        type: Boolean,
        default: false,
      },
      protocolCreated: {
        type: Boolean,
        default: false,
      },
      remarks: {
        type: Boolean,
        default: false,
      },
      noRemarks: {
        type: Boolean,
        default: false,
      },
      protocolBy: {
        type: Boolean,
        default: false,
      },
      protocolUploaded: {
        type: Boolean,
        default: false,
      },
      comments: Array,
    },
    docs: {
      act: {
        name: String,
        path: String,
      }
    },
    files: [
      {
        title: String,
        name: String,
        path: String,
      }
    ],
    application: [
      {
        place: {
          type: String,
          require: false,
          default: '',
        },
        datetime: {
          date: {
            type: Date,
            require: false,
            default: '',
          },
          time: {
            type: String,
            require: false,
            default: '',
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
