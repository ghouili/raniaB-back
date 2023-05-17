const express = require('express');
const ServiceController = require('../controllers/services');
const route = express.Router();

route.post('/add', ServiceController.AddService);

route.get('/', ServiceController.GetAll);

route.get('/:id', ServiceController.FindById);

route.put('/:id', ServiceController.Update);

route.delete('/:id', ServiceController.DeleteService);

module.exports = route