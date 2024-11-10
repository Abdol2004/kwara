const mongoose = require('mongoose');

const GenderEnum = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other"
};

const applySchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true, // Ensure userId is unique
        required: true, // Make it required if necessary
    },
    userCode: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: Object.values(GenderEnum),
    },
    phone: {
        type: String,
        required: true,
    },
    bankDetails: {
        bankName: {
            type: String,
            required: true,
        },
        accountNumber: {
            type: String,
            required: true,
        },
    },
    state: {
        type: String,
        required: true,
    },
    nin: {
        type: String,
        required: true,
    },
    bvn: {
        type: String,
        required: true,
    },
    vin: {
        type: String,
        required: true,
    },
    LGA: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    }
}, {
    timestamps: true // This will automatically add `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Apply', applySchema);