/**
 *@author Dhruv Choudhary <dhruv.1si12cs038@gmail.com>
 @created 2020-12-4
 */

const helper = require("../utils/helper");
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const join = require("../main/joinChannel")
const create = require("../main/createChannel")

/* to log the info, require below modules */
var log4js = require("log4js");
var log = require("../utils/logger")
log4js.configure(log.logging());
var logger = log4js.getLogger();

describe("Slack Join API", () => {

    it("Join the newly Created Channel", async () => {
        logger.info("Slack create API TEST Starts")

        logger.info("creating a channel in slack")
        let channelName = "test-" + helper.randomCharString(4);

        await create
            .createChannel(channelName)
            .then((response) => {
                createdChannel = response.body.channel;
                logger.info("response in create slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                expect(createdChannel.id).to.not.equal(null);
                expect(createdChannel.name).to.equal(channelName);
                logger.info("new channel in slack has been created..")
            })
            .catch((error) => {
                throw error;
            });
        logger.info("Slack join API TEST Starts")
        await join
            .joinChannel(channelName)
            .then((response) => {
                createdChannel = response.body.channel;
                logger.info("response in Join slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                expect(createdChannel.id).to.not.equal(null);
                expect(createdChannel.name).to.equal(channelName);
                logger.info("slack Join Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .catch((error) => {
                throw error;
            });
    })

})

