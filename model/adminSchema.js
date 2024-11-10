const mongoose= require("mongoose")
const adminSchema= new mongoose.Schema({
    adminUsername: {
        type: String,
    },
    adminEmail: {
        type: String,
    },
    adminPassword: {
        type: String,
    }
})

module.exports= mongoose.model('admin', adminSchema)