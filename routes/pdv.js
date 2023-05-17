const express = require('express');
const PdvController = require('../controllers/pdv');
const route = express.Router();

route.get('/', PdvController.GetAll);

route.get('/:id', PdvController.FindById);

route.put('/:id', PdvController.Update);

route.delete('/:id', PdvController.DeletePdv);

route.post('/add', PdvController.AddPdv);


module.exports = route