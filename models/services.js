const mongoose = require("mongoose")
const offre = require("./offre");

const ServiceSchema = new mongoose.Schema({

    nom: { type: String },
    description: { type: String },
    critere_eligibility: { type: String },
    document_requis: [{ type: String }],
    delai_traitement: { type: String },
    picture: { type: String },
    etat: { type: Boolean },
    userid: { type: mongoose.Types.ObjectId, ref: 'user', default: "6464d4db624ebfd44f611142" },
    credits: [{ type: mongoose.Types.ObjectId, ref: 'offre', required: true }],

});

// ServiceSchema.pre("remove", async function (next) {
//     const serviceId = this._id;

//     try {
//         await offre.deleteMany({ packid: serviceId });
//         next();
//     } catch (error) {
//         next(error);
//     }
// });


module.exports = mongoose.model('service', ServiceSchema);