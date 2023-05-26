const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({

    fees:{type:Number ,require: true, unique: true} ,
    id_crédit:{type:Number},
    montant:{type:Number},
    date:{String}
    

});

module.exports = mongoose.model('transaction', TransactionSchema);