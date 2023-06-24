const mongoose = require("mongoose")
const offre = require("./offre");

const notificationSchema = new mongoose.Schema({

    text: { type: String },
    type: { type: String },
    userid: { type: mongoose.Types.ObjectId, ref: 'user' }

});

module.exports = mongoose.model('notification', notificationSchema);