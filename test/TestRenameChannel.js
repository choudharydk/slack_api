/**
 *@author Dhruv Choudhary <dhruv.1si12cs038@gmail.com>
 @created 2020-12-4
 */

const helper = require("../utils/helper");
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const rename = require("../main/renameChannel")
const create = require("../main/createChannel")

/* to log the info, require below modules */
var log4js = require("log4js");
var log = require("../utils/logger")
log4js.configure(log.logging());
var logger = log4js.getLogger();

describe("Slack Rename Channel API", () => {

    it("Rename the newly Created Channel", async () => {
       

        logger.info("creating a channel in slack")
        let channelName = "test-"+helper.randomCharString(4);
        let channelRename = "test-rename-"+helper.randomCharString(4);

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
        logger.info("Slack Rename API TEST Starts")
        await rename
            .renameChannel(createdChannel,channelRename)
            .then((response) => {
                createdChannel = response.body.channel;
                logger.info("response in Rename slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                expect(createdChannel.id).to.not.equal(null);
                expect(createdChannel.name).to.equal(channelRename);
                logger.info("slack Rename Channel Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .catch((error) => {
               throw error;
            });
    })

})

