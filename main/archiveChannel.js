const request = require("../utils/httpServer");
const config = require("../config");
const header = require('../utils/header');


module.exports = {
    /**
     * join a channel in slack
     */
    archiveChannel: (createdChannel) => {
        return new Promise((resolve, reject) => {
            
            let url = config.baseUrl + config.archive_channel;
            let headers = header.plainHeader();
            qs = {
                channel: createdChannel.id,
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