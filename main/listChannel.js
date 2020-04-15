const request = require("../utils/httpServer");
const config = require("../config");
const header = require('../utils/header');

module.exports = {
    /**
     * List a channel in slack
     */
    listChannel: () => {
        return new Promise((resolve, reject) => {

            let url = config.baseUrl + config.list_channel;
            let headers = header.plainHeader();

            qs = {
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