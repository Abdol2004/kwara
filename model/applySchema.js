const mongoose = require('mongoose');

const GenderEnum = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other"
};
const EducationEnum = {
    SSC: "ssc",
    NCE: "nce",
    OND: "ond",
    BSC: "bsc",
    MSC: "msc",
    MPA: "mpa",
    PHD: "phd"
};
const GovEnum = {
    OWOISOWO: "owo isowo",
    YOUTHSKILLEDUNSKILLED: "youth",
    OWOARUGBO: "owo arugbo",
    AGRICIMPLENETS: "agric implements",
    FERTILIZER: "fertilizer",
    SCHOLARSHIP: "scholarship",
    STUDENTAID: "student aid",
    TRANSPORTER: "transpoter",
    OTHET: "other pallatives"
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
    occupation: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        enum: Object.values(EducationEnum),
    },
    govben: {
        type: String,
        enum: Object.values(GovEnum),
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