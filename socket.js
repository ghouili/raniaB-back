const io = require("socket.io")(app, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
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

module.exports = io;