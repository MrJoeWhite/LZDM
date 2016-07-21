/**
 * Created by deng on 16-7-7.
 */
var request = require("request");
var config = require("../config.js");

exports.uploadSerivce = function (room_id, paltform, data) {
    var options = {
        headers: {"Connection": "close"},
        url: config.upload.uploadurl + "dmLZ" +
        "?room_id=" + room_id,
        method: 'POST',
        json: true,
        body: {data: data}
    };

    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('----info------', data);

        }
    }

    request(options, callback);
    // console.log(JSON.stringify({data:data}));
};
