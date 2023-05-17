const transaction =require('../models/transaction')

const AddTransation = async (req, res) => {
  const {  fees,id_crédit, montant  , date} = req.body;
  
      let existingTransaction;
      try {
          existingTransaction = await transaction.findOne({ id_crédit: id_crédit });
      } catch (error) {
          return res.status(500).json({ success: false, message: ' error server', data: error });
      }
  
      if (existingTransaction) {
          return res.status(200).json({ success: false, message: 'transaction already exist!!', data: null });
      }
  
     
  
      const NewTansaction = new transaction({
         
        fees,
        id_crédit, 
        montant ,
        date
        
      });
  
      try {
          await NewTansaction.save();
      } catch (error) {
          return res.status(500).json({ success: false, message: ' server error', data: error  });
      }
  
      return res.status(201).json({ success: true, message: 'transaction added successfully', data: NewTansaction });
  
  }


  const GetAll = async (req, res) => {

    let allTransaction;
    try {
        allTransaction = await transaction.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error ', data: error });
    }

    return res.status(200).json({ success: true, message: 'all Transaction', data: allTransaction });

}

const FindById = async (req , res) => {

    const { id } = req.params;

    let existingTransaction;
    try {
        existingTransaction = await transaction.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingTransaction) {
        return res.status(200).json({ success: false, message: 'Transaction exist pas!!', data: null });
    }

    return res.status(200).json({ success: true, message: 'Transaction founded successfully', data: existingTransaction });

}

const Update = async (req, res) => {

    const {  fees, id_crédit, montant , date } = req.body;
    const { id } = req.params;

    let existingTransaction;
    try {
        existingTransaction = await transaction.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingTransaction) {
        return res.status(200).json({ success: false, message: 'le transaction existe pas!!', data: null });
    }

    

   
    existingTransaction.fees = fees;
    existingTransaction.id_crédit = id_crédit;
   existingTransaction.montant=montant;
   existingTransaction. date= date;

    try {
        await existingTransaction.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'Transaction updated successfully', data: existingTransaction });

}

const DeleteTransaction = async (req, res) => {
    const { id } = req.params;

    let existingTransaction;
    try {
        existingTransaction = await transaction.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'error server', data: error });
    }

    if (!existingTransaction) {
        return res.status(200).json({ success: false, message: 'Transaction nexiste pas!!', data: null });
    }

    try {
        await existingTransaction.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'server error', data: error });
    }

    return res.status(200).json({ success: true, message: ' deleted successfully', data: null });
}


exports.AddTransation =AddTransation;
exports.GetAll=GetAll;
exports.FindById=FindById;
exports.Update=Update;
exports.DeleteTransaction=DeleteTransaction