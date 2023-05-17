const mongoose = require("mongoose")

const CreditSchema = new mongoose.Schema({

    montantWallet:{type:Number} ,
    montant_octroyé:{type:Number},
    Echéance:{type:Number},
    dateCredit:{type:String},
    resultatSimulation:{type:String}

});

module.exports = mongoose.model('credit', CreditSchema);