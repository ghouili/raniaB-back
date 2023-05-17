const mongoose = require("mongoose")

const ServiceSchema = new mongoose.Schema({

    nom:{type: String},
    description:{type :String},
    montant_min:{type:Number},
    montant_max:{type:Number},
    critere_eligibility:{type:String},
    document_requis:{type:String},
    delai_traitement:{type:String},
    
    picture: {type: String},

});

module.exports = mongoose.model('service', ServiceSchema);