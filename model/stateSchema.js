const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  stateName: {
    type: String,
    required: true,
    unique: true, 
  },
  LGAs: [
    {
      lgaName: {
        type: String,
        required: true, 
      },
      wards: [
        {
          type: String, 
        }
      ]
    }
  ]
}, {
  timestamps: true 
});


stateSchema.index({ stateName: 1 });

module.exports = mongoose.model('State', stateSchema);
