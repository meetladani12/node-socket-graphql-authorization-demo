const { gql } = require('apollo-server-express');
const ChatHistory = require('../Models/ChatHistory').ChatHistory;
const User = require('../Models/User').User;
const bcrypt = require('bcryptjs');

const typeDefs = gql `
    type ChatHistory{
        id : ID!,
        sender : String!,
        receiver : String!,
        message : String!
    }

    type User{
        id : ID!,
        name : String!,
        email : String!
    }

    type Query{
        getConversation(sender: String!): [ChatHistory]
    }

    type Mutation{
        addChatToDB(sender: String!, receiver: String!, message: String!): ChatHistory
        registerUser(name: String!, email: String!, password: String!) : User
    }
`;
const resolver = {
    Query : {
        getConversation : async (req, args) =>{
            let history = await ChatHistory.find({})
            return history;
        }
    },
    Mutation : {
        addChatToDB : (req, args) =>{
            let history = new ChatHistory({
                sender: args.sender,
                receiver: args.receiver,
                message: args.message
            });
            return history.save();
        },
        registerUser : async (req, args) =>{
            let encPassword = await bcrypt.hash(args.password,10);
            let user = new User({
                name: args.name,
                email: args.email,
                password: encPassword
            });
            return user.save();
        }
    }
}
module.exports = {typeDefs, resolver}