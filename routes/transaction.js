const express = require('express');
const TransactionController = require('../controllers/transaction');
const route = express.Router();

route.get('/', TransactionController.GetAll);

route.get('/:id', TransactionController.FindById);

route.put('/:id', TransactionController.Update);

route.delete('/:id', TransactionController.DeleteTransaction);

route.post('/add', TransactionController.AddTransation);


module.exports = route