const mongoose = require('mongoose');

const FinanceSchema =  new mongoose.Schema({
    
    name: {type: String},
    tel: {type: Number},  
    adresse: {type: String},
    matriculeFiscale:{type:String , require: true, unique: true},
    avatar: {type: String},
   
});

module.exports = mongoose.model('finance', FinanceSchema);
