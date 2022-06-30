const mongoose = require('mongoose');
const chatHistorySchema = mongoose.Schema({
    sender : {
        type : String,
        required : true
    },
    receiver : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }

},{
    timestamps : true
});
const ChatHistory = mongoose.model('chathistories',chatHistorySchema);
module.exports = { ChatHistory, chatHistorySchema }