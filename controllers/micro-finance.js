const finance = require("../models/micro-finance");


const AddFinance = async (req, res) => {
const {  name,
        tel,  
        adresse,
        matriculeFiscale } = req.body;

    let existingFinance;
    try {
        existingFinance = await finance.findOne({ matriculeFiscale:matriculeFiscale });
    } catch (error) {
        return res.status(500).json({ success: false, message: ' error server', data: error });
    }

    if (existingFinance) {
        return res.status(200).json({ success: false, message: 'user already exist!!', data: null });
    }

   

    const NewFinance = new finance({
       
        name,
        tel,  
        adresse,
        matriculeFiscale ,
        avatar: 'avatar.png',

    });

    try {
        await NewFinance.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error', data: error  });
    }

    return res.status(201).json({ success: true, message: 'Finance added successfully', data: NewFinance });

}

const GetAll = async (req, res) => {

    let allFinance;
    try {
        allFinance = await finance.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error ', data: error });
    }

    return res.status(200).json({ success: true, message: 'all Finances', data: allFinance });

}

const FindById = async (req , res) => {

    const { id } = req.params;

    let existingFinance;
    try {
        existingFinance = await finance.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingFinance) {
        return res.status(200).json({ success: false, message: 'Finance exist pas!!', data: null });
    }

    return res.status(200).json({ success: true, message: 'Finance founded successfully', data: existingFinance });

}

const Update = async (req, res) => {

    const {  name,
        tel,  
        adresse,
        matriculeFiscale  } = req.body;
    const { id } = req.params;

    let existingFinance;
    try {
        existingFinance = await finance.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingFinance) {
        return res.status(200).json({ success: false, message: 'le micro-finance existe pas!!', data: null });
    }

    

    existingFinance.name = name;
    existingFinance.tel = tel;
    existingFinance.adresse = adresse;
    existingFinance.matriculeFiscale = matriculeFiscale;

    try {
        await existingFinance.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'Finance updated successfully', data: existingFinance });

}

const DeleteFinance = async (req, res) => {
    const { id } = req.params;

    let existingFinance;
    try {
        existingFinance = await finance.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingFinance) {
        return res.status(200).json({ success: false, message: 'micro-Finance nexiste pas!!', data: null });
    }

    try {
        await existingFinance.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: ' deleted successfully', data: null });
}

exports.AddFinance=AddFinance
exports.GetAll = GetAll
exports.FindById = FindById
exports.DeleteFinance = DeleteFinance
exports.Update = Update