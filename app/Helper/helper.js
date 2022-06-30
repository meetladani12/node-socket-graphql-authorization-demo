'use strict';

// let config = require(`../../config/${process.env.NODE_ENV}.js`);
let constants = null;
var moment = require("moment-timezone");
var aes256 = require("aes256");
let config = process.env;

module.exports = {
    newDateNow: (length) => {
        var nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });
        return nDate;
    },

    timeNow: () => {
        return (moment.tz(new Date(), constants.timeZone).format());
    },

    utctime: (datetime) => {
        return moment(datetime).toISOString();
    },

    errorLog: (req, error) => {
        errorLogging.create({
            request: JSON.stringify(req.body),
            error: JSON.stringify(error),
            path: req.originalUrl,
            createdDateTimeAt: module.exports.timeNowFormat()
        });
    },

    timeNowFormat: (inputtime) => {
        if (inputtime) {
            return (moment.tz(inputtime, constants.timeZone).format(constants.dateTimeFormat));
        } else {
            return (moment.tz(new Date(), constants.timeZone).format(constants.dateTimeFormat));
        }
    },

    getSomeRandomString: (length) => {
        // var length = 10;
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    generateModelId: (prefix = 'ORD') => {
        let rand = require('unique-random')(1000000000, 9999999999);
        return prefix + rand();
    },

    generateAlphanumericId: (prefix = 'ORD') => {
        let rand = require('unique-random')(1000 /*000000*/ , 9999 /*999999*/ );
        return (prefix + rand() + alphanumeric(4).toString()).toUpperCase();
        //return prefix + (Math.floor(new Date().getTime() + Math.random())).toString();// + (Math.floor(Math.random()*90) + 10).toString();
    },

    dataEncrypt: (pwd) => {
        let key = config.SECRET;
        let encrypted = aes256.encrypt(key, pwd);
        return encrypted;
    },

    dataDecrypt: (pwd) => {
        let key = config.SECRET;
        let decrypt = aes256.decrypt(key, pwd);
        return decrypt;
    },
};