const mongoose = require("mongoose")

const SimulationSchema = new mongoose.Schema({

    montant_échéance:{type: Number}, 
    montant_financement:{type: Number}, 
    Durée:{type:String}, 
    taux_interet:{type: Number}, 
    remboursement:{type:String}


});

module.exports = mongoose.model('Simulation', SimulationSchema);