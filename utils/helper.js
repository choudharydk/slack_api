/**
 *@author Dhruv Choudhary 
 */

module.exports = {

    randomNumber: (length) => {

        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));

    },

    randomCharString: (length) => {

        var char = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < length; i++)

            char += possible.charAt(Math.floor(Math.random() * possible.length));

        return char;
    },
    randomNumericString: (length) => {

        var num = "";
        var possible = "1234567890";

        for (var i = 0; i < length; i++)

            num += possible.charAt(Math.floor(Math.random() * possible.length));

        return num;
    },
    randomAlphanumeric: (length) => {

        var char = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            char += possible.charAt(Math.floor(Math.random() * possible.length));

        return char;

    }

}



