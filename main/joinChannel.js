const request = require("../utils/httpServer");
const config = require("../config");
const header = require('../utils/header');

module.exports = {
    /**
     * join a channel in slack
     */
    joinChannel: (channelName) => {
        return new Promise((resolve, reject) => {
            let url = config.baseUrl + config.join_channel;
            let headers = header.plainHeader();
            qs = {
                name: channelName,
                token: config.signinToken
            }

            request
                .requestPromiseQuery(url, 'GET', headers, null, qs)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                });
        });

    }
}