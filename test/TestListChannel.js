/**
 *@author Dhruv Choudhary <dhruv.1si12cs038@gmail.com>
 @created 2020-12-4
 */


const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const list = require("../main/listChannel")
const helper = require("../utils/helper")
const create = require("../main/createChannel")


/* to log the info, require below modules */
var log4js = require("log4js");
var log = require("../utils/logger")
log4js.configure(log.logging());
var logger = log4js.getLogger();

describe("Slack List API", () => {

    it("List all Channels and verfiy if newly created channel is present", async () => {


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

        logger.info("Slack List channel API TEST Starts");
        await list
            .listChannel()
            .then((response) => {
                let channel = response.body.channels;
                logger.info("response in List slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                channel.forEach(element => {
                    if (element.id === createdChannel.id) {
                        logger.info("found newly created channel in the list and verify....")
                        expect(element.name).to.equal(channelName);
                        logger.info("newly created channel in the list is verified....")
                    }

                });

                logger.info("slack List Channel Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .catch((error) => {
                throw error
            });

    })

})

