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

//Models::::
const socketIds = require('./models/socketIds');

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

server.get('/socketids', async (req, res) => {
    let allsocketIds;
    try {
        allsocketIds = await socketIds.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: ' server error ', data: error });
    }

    return res.status(200).json({ success: true, message: 'all socketIds', data: allsocketIds });
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

    // socket.on("userConnected", async ({data}) => {
    //     console.log("data: ");
    //     console.log(data);
    // });
    socket.on("userConnected", async ({ data }) => {
        console.log("userConnected");
        let existingsocketIds;
        // Check if socketIds exist ::::
        try {
            existingsocketIds = await socketIds.findOne({ userid: data });
        } catch (error) {
            console.log({ success: false, message: 'internal server error ', data: error });
        }

        if (existingsocketIds) {
            // Update socketIds::
            existingsocketIds.socketid = socket.id;
            try {
                await socketIds.save();
            } catch (error) {
                console.log(error);;
            }
        } else {

            // Create a new socketIds:::
            let newsocketIds = new socketIds({
                userid: data,
                socketid: socket.id
            });

            try {
                await newsocketIds.save();
            } catch (error) {
                return;
            }
        }


    });

    io.on("alertUser", ({ userID, data }) => {
        io.to(userID).emit("Alert", { success: true, data });
    })
});



mongoose.connect('mongodb+srv://admin:admin@pfe.eomjtm9.mongodb.net/?retryWrites=true&w=majority')
    .then(result => app.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
    .catch(err => console.log(err));
