const express = require('express');
const SimulateurController = require('../controllers/simulationr');
const route = express.Router();

route.post('/add', SimulateurController.AddSimulateur);

route.get('/', SimulateurController.GetAll);

route.get('/:id', SimulateurController.FindById);

route.put('/:id', SimulateurController.Update);

route.delete('/:id', SimulateurController.DeleteSimulateur);

module.exports = route