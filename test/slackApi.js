/**
 *@author Dhruv Choudhary <dhruv.1si12cs038@gmail.com>
 @created 2020-12-4
 */


const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const request = require("../utils/httpServer");
const config = require("../config");
const header = require('../utils/header');


/* to log the info, require below modules */
var log4js = require("log4js");
var log = require("../utils/logger")
log4js.configure(log.logging());
var logger = log4js.getLogger();

describe("Slack API", () => {

    let baseUrl = config.baseUrl;
    let url;
    let headers = header.plainHeader();

    let channelName = config.channelName;
    let channelRename = config.channelRename;
    let createdChannel;
    it("Create a new Channel", (done) => {
        logger.info("Slack create API TEST Starts")
        let uri = config.create_channel;
        url = baseUrl + uri;


        data = {
            name: channelName,
            token: config.signinToken
        }

        request
            .requestPromiseQuery(url, 'POST', headers, data)
            .then((response) => {
                createdChannel = response.body.channel;
                logger.info("url in create slack channel is", url)
                logger.info("response in create slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                expect(createdChannel.id).to.not.equal(null);
                expect(createdChannel.name).to.equal(channelName);
                logger.info("slack Create Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })

    it("Join the newly Created Channel", (done) => {
        logger.info("Slack join API TEST Starts")
        let uri = config.join_channel;

        url = baseUrl + uri;

        qs = {
            name: channelName,
            token: config.signinToken
        }

        request
            .requestPromiseQuery(url, 'GET', headers, null, qs)
            .then((response) => {
                createdChannel = response.body.channel;
                logger.info("url in Join slack channel is", url)
                logger.info("response in Join slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                expect(createdChannel.id).to.not.equal(null);
                expect(createdChannel.name).to.equal(channelName);
                logger.info("slack Join Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });
    })

    it("Rename the newly Created Channel", (done) => {
        logger.info("Slack Rename Channel API TEST Starts")
        let uri = config.rename_channel;

        url = baseUrl + uri;

        qs = {
            name: channelRename,
            channel: createdChannel.id,
            token: config.signinToken
        }

        request
            .requestPromiseQuery(url, 'GET', headers, null, qs)
            .then((response) => {
                createdChannel = response.body.channel;
                logger.info("url in Rename slack channel is", url)
                logger.info("response in Rename slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                expect(createdChannel.id).to.not.equal(null);
                expect(createdChannel.name).to.equal(channelRename);
                logger.info("slack Rename Channel Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });

    })

    it("List all the Channel", (done) => {
        logger.info("Slack List Channel API TEST Starts")
        let uri = config.list_channel;

        url = baseUrl + uri;

        qs = {
            token: config.signinToken
        }

        request
            .requestPromiseQuery(url, 'GET', headers, null, qs)
            .then((response) => {
                let channel = response.body.channels;
                logger.info("url in List slack channel is", url)
                logger.info("response in List slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                channel.forEach(element => {
                    if (element.id === channel.id) {

                        expect(element.name).to.equal(channelRename);
                        expect(element).to.have.property('id', 'name', 'is_channel', 'members');
                    }

                });

                logger.info("slack List Channel Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });

    })

    it("Archieve the newly created Channel", (done) => {
        logger.info("Slack Archieve Channel API TEST Starts")
        let uri = config.archive_channel;

        url = baseUrl + uri;

        qs = {
            channel: createdChannel.id,
            token: config.signinToken
        }

        request
            .requestPromiseQuery(url, 'GET', headers, null, qs)
            .then((response) => {

                logger.info("url in Archieve slack channel is", url)
                logger.info("response in Archieve slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                expect(response.body.ok).to.be.true;

                logger.info("slack List Channel Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });

    })

    it("Validate if the Channel is archived successfully", (done) => {
        logger.info("Slack List Channel API TEST Starts")
        let uri = config.list_channel;

        url = baseUrl + uri;

        qs = {
            token: config.signinToken
        }

        request
            .requestPromiseQuery(url, 'GET', headers, null, qs)
            .then((response) => {
                let channel = response.body.channels;
                logger.info("url in List slack channel is", url)
                logger.info("response in List slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                channel.forEach(element => {
                    if (element.id === channel.id) {
                        expect(element.is_archived).to.be.true;

                    }

                });

                logger.info("slack List Channel Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .then(() => done(), done)
            .catch((error) => {
                done(error);
            });

    })
})
