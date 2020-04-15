/**
 *@author Dhruv Choudhary <dhruv.1si12cs038@gmail.com>
 @created 2020-12-4
 */


const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const create = require("../main/createChannel")
const helper = require("../utils/helper")

/* to log the info, require below modules */
var log4js = require("log4js");
var log = require("../utils/logger")
log4js.configure(log.logging());
var logger = log4js.getLogger();

describe("Slack Create API", () => {

    let dataItem = [
        {name: "test-" + helper.randomCharString(4)},
        {name: "test-" + helper.randomCharString(2)},
      ];

      dataItem.forEach((run) =>{
      it("Creating a new Channel '"+run.name+"'", async () => {
        logger.info("Slack create API TEST Starts")

        await create
            .createChannel(run.name)
            .then((response) => {
                createdChannel = response.body.channel;
                logger.info("response in create slack channel is", JSON.stringify(response.body))
                expect(response.statusCode).to.equal(200);
                expect(createdChannel.id).to.not.equal(null);
                expect(createdChannel.name).to.equal(run.name);
                logger.info("slack Create Service API TEST ENDS")
                logger.info("********************************************************************")
            })
            .catch((error) => {
                throw error
            });

    })
})

})

