let RegisterController = require('../Controller/RegisterController')
let _ = require('underscore');
let User = require('../Models/User').User;
module.exports = async (socket,next)=>{
    if (socket.handshake.auth &&
        socket.handshake.auth.token &&
        socket.handshake.auth.token != ''
    ) {
        let token = socket.handshake.auth.token;
        let userCheck = await User.findOne({
            $and: [
                { "token": token }
            ]
        })
        if (!_.isEmpty(userCheck)) {
            socket.authMessage = "Authenticated";
            socket.authStatus = true;
            socket.user = userCheck;
        } else {
            socket.authMessage = "Token Expired.";
            socket.authStatus = false;
        }
    }else{
        socket.authMessage = "Login Required.";
        socket.authStatus = false;
    }
    next();
}