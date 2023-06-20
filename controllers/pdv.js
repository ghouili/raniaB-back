const Pdv= require('../models/pdv')


const AddPdv = async (req, res) => {
    const {   prenom,
    tel,
    ville,
    adresse,
    registre_de_commerce,
    nom_boutique,
    secteur_activiti,
    patente,
    cin } = req.body;
    
        let existingPdv;
        try {
            existingPdv = await Pdv.findOne({ tel: tel });
        } catch (error) {
            return res.status(500).json({ success: false, message: ' error server', data: error });
        }
    
        if (existingPdv) {
            return res.status(200).json({ success: false, message: 'Pdv already exist!!', data: null });
        }
    
       
    
        const NewPdv = new Pdv({

            prenom,
            tel,
            ville,
            adresse,
            registre_de_commerce,
            nom_boutique,
            secteur_activiti,
            patente,
            cin
          
        });
    
        try {
            await NewPdv.save();
        } catch (error) {
            return res.status(500).json({ success: false, message: ' server error', data: error  });
        }
    
        return res.status(201).json({ success: true, message: 'Pdv added successfully', data: NewPdv});
    
}

const GetAll = async (req, res) => {

    let allPdv;
    try {
        allPdv = await Pdv.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error ', data: error });
    }

    return res.status(200).json({ success: true, message: 'all Pdvs', data: allPdv });

}

const FindById = async (req , res) => {

    const { id } = req.params;

    let existingPdv;
    try {
        existingPdv = await Pdv.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingPdv) {
        return res.status(200).json({ success: false, message: 'PDVexist pas!!', data: null });
    }

    return res.status(200).json({ success: true, message: 'PDV founded successfully', data: existingPdv });

}

const Update = async (req, res) => {

    const {    prenom,
         tel,
        ville,
        adresse,
        registre_de_commerce,
        nom_boutique,
        secteur_activiti,
        patente,
        cin } = req.body;
    const { id } = req.params;

    let existingPdv;
    try {
        existingPdv = await Pdv.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingPdv) {
        return res.status(200).json({ success: false, message: 'Pdv existe pas!!', data: null });
    }

    
    
    existingPdv.prenom= prenom;
    existingPdv.tel =tel;
    existingPdv.ville =ville;
    existingPdv.adresse=adresse;
    existingPdv.registre_de_commerce= registre_de_commerce;
    existingPdv.nom_boutique=nom_boutique;
    existingPdv.secteur_activiti= secteur_activiti;
    existingPdv.patente=patente;
    existingPdv.cin=cin;

    try {
        await existingPdv.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'Pdv updated successfully', data: existingPdv });

}

const DeletePdv = async (req, res) => {
    const { id } = req.params;

    let existingPdv;
    try {
        existingPdv = await Pdv.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingPdv) {
        return res.status(200).json({ success: false, message: 'Pdv nexiste pas!!', data: null });
    }

    try {
        await existingPdv.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: ' deleted successfully', data: null });
}

exports.AddPdv=AddPdv;
exports.GetAll=GetAll;
exports.FindById=FindById;
exports.Update=Update;
exports.DeletePdv=DeletePdv;