const mongoose = require("mongoose")

const PdvSchema = new mongoose.Schema({
    
    prenom:{type:String},
    tel:{type: Number},
    ville:{type :String},
    adresse:{type:String},
    registre_de_commerce:{type:Number},
    nom_boutique:{type:String},
    secteur_activiti:{type:String},
    patente:{type:String},
    cin:{type:Number}
   
});

module.exports = mongoose.model('point de vente', PdvSchema);