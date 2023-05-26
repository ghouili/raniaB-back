const express = require('express');
const FinanaceController = require('../controllers/micro-finance');
const route = express.Router();

route.get('/', FinanaceController.GetAll);

route.get('/:id', FinanaceController.FindById);

route.put('/:id', FinanaceController.Update);

route.delete('/:id', FinanaceController.DeleteFinance);

route.post('/add', FinanaceController.AddFinance);



module.exports = route