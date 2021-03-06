/**
 *@author Dhruv Choudhary <dhruv.1si12cs038@gmail.com>
 @created 2020-12-4
 */

module.exports = {
    /**
     * for all requests use json headers
     */
     plainHeader: function () {
        var headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "charset": "UTF-8"
        };

        return headers;
    },
}