const mongoose = require("mongoose")

const CreditSchema = new mongoose.Schema({

    montant:{type:Number} ,
    montant_ech:{type:Number} ,
    duree:{type:Number} ,
    grasse:{type:Number} ,
    payed:{type:Number} ,
    etat:{type:String} ,
    date:{type:String} ,
    rembource:{type:String} ,
    packid:{type: mongoose.Types.ObjectId, ref: 'service', required: true} ,
    userid:{type: mongoose.Types.ObjectId, ref: 'user', required: true} ,


});

module.exports = mongoose.model('credit', CreditSchema);