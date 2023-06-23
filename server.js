const express = require('express');
const server = express();
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = require("http").createServer(server);
const io = require("socket.io")(app, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

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

// Attach io object to the request object using middleware
// server.use((req, res, next) => {
//     req.io = io;
//     next();
// });

server.use((req, res, next) => {
    req.io = io;
    next();
  });

io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    console.log('user just connected with id :' + socket.id);
    // Handle disconnect event
    socket.on("disconnect", () => {
        console.log('User disconnected with ID: ' + socket.id);
        // Perform any necessary cleanup or additional logic here
    });
});

mongoose.connect('mongodb+srv://admin:admin@pfe.eomjtm9.mongodb.net/?retryWrites=true&w=majority')
    .then(result => app.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
    .catch(err => console.log(err));
