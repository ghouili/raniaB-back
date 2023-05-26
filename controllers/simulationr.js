const simulateur = require("../models/simulation");

const AddSimulateur = async (req, res) => {
    const {    montant_échéance, montant_financement, Durée, taux_interet, remboursement} = req.body;
    
        let existingSimulateur;
        try {
            existingSimulateur = await simulateur.findOne({montant_échéance: montant_échéance });
        } catch (error) {
            return res.status(500).json({ success: false, message: ' error server', data: error });
        }
    
        if (existingSimulateur) {
            return res.status(200).json({ success: false, message: 'simulateur already exist!!', data: null });
        }
    
       
    
        const NewSimulateur = new simulateur({
            
            montant_échéance,
            montant_financement, 
            Durée, 
            taux_interet, 
            remboursement
          
        });
    
        try {
            await NewSimulateur.save();
        } catch (error) {
            return res.status(500).json({ success: false, message: ' server error', data: error  });
        }
    
        return res.status(201).json({ success: true, message: 'simulateur added successfully', data: NewSimulateur});
    
}
const GetAll = async (req, res) => {

    let allSimulateur;
    try {
        allSimulateur = await simulateur.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error ', data: error });
    }

    return res.status(200).json({ success: true, message: 'all Simulateur', data: allSimulateur });

}

const FindById = async (req , res) => {

    const { id } = req.params;

    let existingSimulateur;
    try {
        existingSimulateur = await simulateur.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingSimulateur) {
        return res.status(200).json({ success: false, message: 'Simulateur exist pas!!', data: null });
    }

    return res.status(200).json({ success: true, message: 'Simulateur founded successfully', data: existingSimulateur });

}

const Update = async (req, res) => {

    const {  montant_échéance, montant_financement, Durée, taux_interet, remboursement} = req.body;
    const { id } = req.params;

    let existingSimulateur;
    try {
        existingSimulateur = await simulateur.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingSimulateur) {
        return res.status(200).json({ success: false, message: 'Simulateur existe pas!!', data: null });
    }

    

   
    existingSimulateur.montant_échéance = montant_échéance;
    existingSimulateur.montant_financement = montant_financement;
    existingSimulateur.Durée = Durée;
    existingSimulateur.taux_interet = taux_interet;
    existingSimulateur.remboursement = remboursement;


    try {
        await existingSimulateur.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'Simulateur updated successfully', data: existingSimulateur });

}

const DeleteSimulateur = async (req, res) => {
    const { id } = req.params;

    let existingSimulateur;
    try {
        existingSimulateur = await simulateur.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingSimulateur) {
        return res.status(200).json({ success: false, message: 'Simulateur nexiste pas!!', data: null });
    }

    try {
        await existingSimulateur.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: ' deleted successfully', data: null });
}
exports.AddSimulateur=AddSimulateur
exports.GetAll=GetAll
exports.FindById=FindById
exports.Update=Update
exports.DeleteSimulateur=DeleteSimulateur