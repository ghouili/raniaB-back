const credit= require('../models/credit')


const AddCredit = async (req, res) => {
    const {  montantWallet ,
    montant_octroyé,
    Echéance,
    dateCredit,
    resultatSimulation
    } = req.body;
    
        let existingCredit;
        try {
            existingCredit = await credit.findOne({ numéro: numéro });
        } catch (error) {
            return res.status(500).json({ success: false, message: ' error server', data: error });
        }
    
        if (existingCredit) {
            return res.status(200).json({ success: false, message: 'credit already exist!!', data: null });
        }
    
       
    
        const NewCredit = new credit({
            
            montantWallet ,
            montant_octroyé,
            Echéance,
            dateCredit,
            resultatSimulation
          
        });
    
        try {
            await NewCredit.save();
        } catch (error) {
            return res.status(500).json({ success: false, message: ' server error', data: error  });
        }
    
        return res.status(201).json({ success: true, message: 'credit added successfully', data: NewCredit});
    
}

const GetAll = async (req, res) => {

    let allCredit;
    try {
        allCredit = await credit.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error ', data: error });
    }

    return res.status(200).json({ success: true, message: 'all credits', data: allCredit });

}

const FindById = async (req , res) => {

    const { id } = req.params;

    let existingCredit;
    try {
        existingCredit = await credit.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingCredit) {
        return res.status(200).json({ success: false, message: 'crédit exist pas!!', data: null });
    }

    return res.status(200).json({ success: true, message: 'crédit founded successfully', data: existingCredit });

}

const Update = async (req, res) => {

    const {  montantWallet ,
        montant_octroyé,
        Echéance,
        dateCredit,
        resultatSimulation } = req.body;
    const { id } = req.params;

    let existingCredit;
    try {
        existingCredit = await credit.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingCredit) {
        return res.status(200).json({ success: false, message: 'CREDIT existe pas!!', data: null });
    }

    

   
    existingCredit.montantWallet= montantWallet;
    existingCredit. montant_octroyé =  montant_octroyé;
    existingCredit.Echéance = Echéance;
    existingCredit.dateCredit= dateCredit;
    existingCredit.resultatSimulation= resultatSimulation;
    try {
        await existingCredit.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'CREDIT updated successfully', data: existingCredit });

}
const DeleteCredit = async (req, res) => {
    const { id } = req.params;

    let existingCredit;
    try {
        existingCredit = await credit.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingCredit) {
        return res.status(200).json({ success: false, message: 'credit nexiste pas!!', data: null });
    }

    try {
        await existingCredit.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: ' deleted successfully', data: null });
}

exports.AddCredit=AddCredit;
exports.GetAll=GetAll;
exports.FindById=FindById;
exports.Update=Update;
exports.DeleteCredit=DeleteCredit;