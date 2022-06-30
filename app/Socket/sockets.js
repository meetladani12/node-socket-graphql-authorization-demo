const RegisterController = require('../Controller/RegisterController');
const ConversationCotroller = require('../Controller/ConversationCotroller');
const SocketAuth = require('../Middleware/SocketAuth');
module.exports = (io) => {
    io.of('/signup').on('connection', function(socket) {
        socket.on('register', async (data) => {
            let response = await RegisterController.register(data);
            socket.emit('register_response', response);
        });
        socket.on('login', async (data) => {
            let response = await RegisterController.loginUser(data);
            socket.emit("login_response", response);
        })
    });
    
    io.of('/chat').use(SocketAuth).on('connection',function(socket) {
        let authData = {
            authMessage : socket.authMessage,
            authStatus : socket.authStatus,
            user : socket.user 
        }
        socket.emit("auth_response",authData);

        socket.on('join', function (data) {
            socket.join(data.id);
        });

        socket.on('getUsers',async (data)=>{
            let response = await ConversationCotroller.getFriends(data);
            socket.emit('online_users',response.data.getUsers);
        });

        socket.on('get_conversation',async (data)=>{
            let response = await ConversationCotroller.getChats(data);
            socket.emit('chat_history',response.data.getConversation);
        });

        socket.on('save_chat',async (data)=>{
            let response = await ConversationCotroller.saveChats(data);
            socket.emit('chat_saved',response.data.addChatToDB.id);
            socket.in(data.receiverId).emit('new_msg', {msg: data.message});
        });
    });
}