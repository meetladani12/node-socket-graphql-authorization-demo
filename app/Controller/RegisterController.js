const axios = require('axios');
const User = require('../Models/User').User;
const bcrypt = require('bcryptjs');
let _ = require('underscore');
const Helper = require('../Helper/helper');
module.exports = {
    chatHistory: (req) => {
        let data = JSON.stringify({
            query: `mutation{
            addChatToDB(sender: "Messi", receiver: "meet", message: "Test Message") {
              id
              sender
              receiver
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

    register: (req) => {
        let data = JSON.stringify({
            query: `mutation{
                registerUser(name: "${req.name}", email: "${req.email}", password: "${req.password}") {
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
                response.data.status = true;
                return response.data;
            })
            .catch(function (error) {
                error.status = false;
                return error;
            });
        return response;
    },

    loginUser: async (req) => {
        let email = (req.email).trim();
        let password = (req.password).trim();
        let userCheck = await User.findOne({
            $and: [
                { "email": email },
                { "isActive": true },
            ]
        });
        if (_.isEmpty(userCheck)) {
            return {
                "status": false,
                "data": [],
                "message": `${email} not found in system.`
            };
        } else {
            if(await bcrypt.compare(password, userCheck.password)){
                userCheck.token = '';
                userCheck.updateAt = new Date();
                userCheck.token = Helper.dataEncrypt(JSON.stringify(userCheck));
                await userCheck.save();
                return {
                    "status": true,
                    "data": userCheck,
                    "message": "Logged in successfully."
                };
            }else{
                console.log(2);
                return {
                    "status": false,
                    "data": [],
                    "message": "Password does not match"
                };
            }
        }
    }


}