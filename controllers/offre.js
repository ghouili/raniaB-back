const offre = require("../models/offre");

const Addoffre = async (req, res) => {
    const {
        title,
        description,
        montant_min,
        montant_max
    } = req.body;

    let picture = 'service.jpg';
    if (req.file) {
        picture = req.file.filename;
    }
    const Newoffre = new offre({
        title,
        description,
        montant_min,
        montant_max,
        picture
    });

    try {
        await Newoffre.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error', data: error });
    }

    return res.status(201).json({ success: true, message: 'offre added successfully', data: Newoffre });

}

const GetAll = async (req, res) => {

    let alloffre;
    try {
        alloffre = await offre.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error ', data: error });
    }

    return res.status(200).json({ success: true, message: 'all offre', data: alloffre });

}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existingoffre;
    try {
        existingoffre = await offre.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingoffre) {
        return res.status(200).json({ success: false, message: 'offre exist pas!!', data: null });
    }

    return res.status(200).json({ success: true, message: 'offre founded successfully', data: existingoffre });

}

const Update = async (req, res) => {

    const {
        title,
        description,
        montant_min,
        montant_max
    } = req.body;
    const { id } = req.params;

    let existingoffre;
    try {
        existingoffre = await offre.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingoffre) {
        return res.status(200).json({ success: false, message: 'offre existe pas!!', data: null });
    }

    if (req.file && existingoffre.picture) {
        let path = `./uploads/images/${existingoffre.picture}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }
        existingoffre.picture = req.file.filename;

    }

    existingoffre.title = title;
    existingoffre.description = description;
    existingoffre.montant_min = montant_min;
    existingoffre.montant_max = montant_max;

    try {
        await existingoffre.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'offre updated successfully', data: existingoffre });

}

const Deleteoffre = async (req, res) => {
    const { id } = req.params;

    let existingoffre;
    try {
        existingoffre = await offre.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingoffre) {
        return res.status(200).json({ success: false, message: 'offre nexiste pas!!', data: null });
    }

    try {
        await existingoffre.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    if (existingoffre.picture) {
        let path = `./uploads/images/${existingoffre.avatar}`;
        try {
            fs.unlinkSync(path)
            //file removed
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error, error: error })
        }

    }


    return res.status(200).json({ success: true, message: ' deleted successfully', data: null });
}

exports.Addoffre = Addoffre
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Deleteoffre = Deleteoffre