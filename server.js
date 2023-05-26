const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');
const path = require('path');

//MiddleWares::::
const authMiddleware = require('./MiddleWare/auth');

//Routers::
const FinanceRouter = require('./routes/micro-finance');
const UserRouter = require('./routes/user');
const CreditRouter = require('./routes/credit');
const SimulateurRouter = require('./routes/simulateur');
const ServiceRouter = require('./routes/services');
const TransactionRouter = require('./routes/transaction');
const PdvRouter = require('./routes/pdv');
const OffreRouter = require('./routes/offre');

const PORT = 5000;
const server = express();
server.use(cors({
    origin: '*'
}));
server.use(body_parser.json());

server.use("/uploads/images", express.static(path.join("uploads", "images")));


server.get('/', (req, res) => {
    return res.send('Hello world!!');
});

server.use('/user', UserRouter);
server.use('/finance', FinanceRouter);
server.use('/credit', CreditRouter);
server.use('/simulateur', SimulateurRouter);
server.use('/service', ServiceRouter);
server.use('/transaction', TransactionRouter);
server.use('/pdv', PdvRouter);
server.use('/offre', OffreRouter);

// Protected route example
// app.get('/protected', authMiddleware.authenticate, (req, res) => {
//     res.json({ message: 'This is a protected route' });
//   });

mongoose.connect('mongodb+srv://admin:admin@pfe.eomjtm9.mongodb.net/?retryWrites=true&w=majority')
    .then(result => server.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
    .catch(err => console.log(err));