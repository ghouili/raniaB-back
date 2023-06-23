const mongoose = require("mongoose")
const offre = require("./offre");

const ServiceSchema = new mongoose.Schema({

    text: { type: String },
    type: { type: String },
    seen: { type: Boolean },
    userid: { type: mongoose.Types.ObjectId, ref: 'user' }

});

module.exports = mongoose.model('service', ServiceSchema);