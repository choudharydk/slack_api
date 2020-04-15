/**
 *@author Dhruv Choudhary
 */
'use strict';
const faker = require('faker');
var today = new Date();

var ms=today.getMilliseconds();
var sec=today.getSeconds();
var secms=sec+''+ms;

const User = {

    name:faker.name.firstName(),
    lastName:faker.name.lastName(),
    findName:faker.name.findName(),
    prefix: faker.name.prefix(),
    suffix:faker.name.suffix(),
    company:faker.company.companyName(),

    address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),

    bio: faker.lorem.sentences(),
    word:faker.lorem.word()+secms,

    date:today,
    number:faker.number
};

module.exports = User;

