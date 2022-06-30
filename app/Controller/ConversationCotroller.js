const axios = require('axios');
const User = require('../Models/User').User;
let _ = require('underscore');
const Helper = require('../Helper/helper');

module.exports = {
    getFriends: (param) => {
        let data = JSON.stringify({
            query: `query{ 
                getUsers(id: "${param.id}") {
                  id
                  name
                  email
                }
            }`,
            variables: {}
        });

        let config = {
            method: 'post',
            url: 'http://localhost:3000/graphql',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            data: data
        };

        let response = axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
        return response;
    },
    getChats: (param) => {
        let data = JSON.stringify({
            query: `query{
                getConversation(sender: "${param.senderId}", receiver: "${param.userId}") {
                  id
                  message
                  sender
                }
            }`,
            variables: {}
        });

        let config = {
            method: 'post',
            url: 'http://localhost:3000/graphql',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            data: data
        };

        let response = axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
        return response;
    },
    saveChats: (param) => {
        let data = JSON.stringify({
            query: `mutation{
                addChatToDB(sender: "${param.userId}", receiver: "${param.receiverId}", message: "${param.message}") {
                  id
                }
            }`,
            variables: {}
        });

        let config = {
            method: 'post',
            url: 'http://localhost:3000/graphql',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            data: data
        };

        let response = axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
        return response;
    }
}