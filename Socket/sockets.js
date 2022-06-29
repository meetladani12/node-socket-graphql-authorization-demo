const RegisterController = require('../Controller/RegisterController');
module.exports = (io) => {
    io.on("connection", (socket) => {
        // console.log(socket.handshake.url);
        console.log("Socket Id:", socket.id);
        socket.on('register', async (data) => {
            let response = await RegisterController.register(data);
            socket.emit('register_response', response);
        });
        socket.on('login', async (data) => {
            let response = await RegisterController.loginUser(data);
            console.log(response);
            // io.emit("notesaved", data);
        })
    });
}