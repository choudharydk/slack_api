const faker = require("../utils/faker");
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const request = require("../utils/httpServer");
const config = require("../config");
const header = require('../utils/header');

module.exports = {
    /**
     * create a channel in slack
     */
    createChannel: (channelName) => {
        return new Promise((resolve, reject) => {

            let url = config.baseUrl + config.create_channel;

            let headers = header.plainHeader();

            data = {
                name: channelName,
                token: config.signinToken
            }
            request
                .requestPromiseQuery(url, 'POST', headers, data)
                .then((response) => {
                    resolve(response)
                })

                .catch((error) => {
                    reject(error)
                });
        });

    }
}