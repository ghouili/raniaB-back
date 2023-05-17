const express = require('express');
const CreditController = require('../controllers/credit');
const route = express.Router();

route.post('/add', CreditController.AddCredit);

route.get('/', CreditController.GetAll);

route.get('/:id', CreditController.FindById);

route.put('/:id', CreditController.Update);

route.delete('/:id', CreditController.DeleteCredit);


module.exports = route